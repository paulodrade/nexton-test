/**
 * In-memory data service for simulating backend API responses.
 * Provides mock data and simulates random failures for testing purposes.
 *
 * This service implements custom endpoints and error simulation for GET and PUT requests,
 * using the angular-in-memory-web-api.
 */
import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
} from 'angular-in-memory-web-api';

import { Schema, RequestData } from '../interfaces/form-schema.interfaces';
import schemasJson from './schemas.json';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  /**
   * Creates the in-memory database with initial collections.
   * @returns An object containing software, hardware, and requests collections.
   */
  createDb() {
    const schemas = schemasJson as Schema[];
    const [software, hardware] = schemas;

    const requests: RequestData[] = [];

    return { software, hardware, requests, schemas };
  }

  /**
   * Helper to randomly determine if a simulated failure should occur (between 10% and 20%).
   * @returns True if the request should fail, false otherwise.
   */
  private maybeFail(): boolean {
    return false; // Math.random() <= 0.1 + Math.random() * 0.1;
  }

  /**
   * Intercepts GET requests to /api/schemas and simulates random failures.
   * For other GET requests, default handling is used.
   * @param reqInfo Information about the incoming request.
   * @returns A simulated error response or undefined to use default handling.
   */
  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'schemas') {
      if (this.maybeFail()) {
        return reqInfo.utils.createResponse$(() => ({
          status: STATUS.INTERNAL_SERVER_ERROR,
          url: reqInfo.url,
          headers: reqInfo.headers,
          body: { error: 'Random simulated server error (GET /api/schemas)' },
        }));
      }
      // Let default handler return the "schemas" collection (200)
      return undefined;
    }
    // For other GETs, use default
    return undefined;
  }

  /**
   * Handles custom endpoint: PUT /api/requests/:id/question/:questionId.
   * Simulates random failures and updates the answer for a specific question in a request.
   * @param reqInfo Information about the incoming request.
   * @returns A simulated error response, not found, or success response.
   */
  put(reqInfo: RequestInfo) {
    const match = reqInfo.req.url.match(
      /\/api\/requests\/([^/]+)\/question\/(\d+)/
    );
    if (!match) {
      // Not our custom route → let default behavior handle (e.g., PUT /api/requests/:id if used)
      return undefined;
    }

    // Random failure
    if (this.maybeFail()) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.INTERNAL_SERVER_ERROR,
        url: reqInfo.url,
        headers: reqInfo.headers,
        body: {
          error:
            'Random simulated server error (PUT /api/requests/:id/question/:questionId)',
        },
      }));
    }

    const [, reqId, questionIdStr] = match;
    const questionId = Number(questionIdStr);
    const body = reqInfo.utils.getJsonBody(reqInfo.req) as { value: unknown };

    // Access the "requests" collection
    // NOTE: When you route a custom URL, reqInfo.collectionName may still be 'requests'
    const requests = ((reqInfo as any).db['requests'] as RequestData[]) ?? [];
    const idx = requests.findIndex((r) => r.id === reqId);

    if (idx === -1) {
      return reqInfo.utils.createResponse$(() => ({
        status: STATUS.NOT_FOUND,
        url: reqInfo.url,
        headers: reqInfo.headers,
        body: { error: 'Request not found' },
      }));
    }

    const request = requests[idx];
    request.answers ||= {}; // if falsy, initialize as empty object
    request.answers[questionId] = body?.value;

    return reqInfo.utils.createResponse$(() => ({
      status: STATUS.OK,
      url: reqInfo.url,
      headers: reqInfo.headers,
      body: { id: reqId, updated: { [questionId]: body?.value } },
    }));
  }
}
