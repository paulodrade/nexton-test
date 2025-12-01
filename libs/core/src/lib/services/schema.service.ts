import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, throwError, of } from 'rxjs';
import {
  retryWhen,
  concatMap,
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { Schema } from '../interfaces/form-schema.interfaces';

/**
 * Interface for the response returned when updating a question.
 * @property id The identifier of the updated entity.
 * @property updated A record containing updated question values, indexed by question ID.
 */
export interface UpdateResponse {
  id: string;
  updated: Record<number, unknown>;
}

/**
 * Service for handling schema-related API operations.
 * Provides methods to fetch schemas and update questions with retry logic.
 */
@Injectable({ providedIn: 'root' })
export class SchemaService {
  /**
   * Angular HTTP client for making API requests.
   */
  private http = inject(HttpClient);

  /**
   * Base URL for API endpoints.
   */
  private readonly base = '/api';

  /**
   * Applies exponential backoff retry strategy for transient HTTP errors.
   * @template T Type of the observable stream.
   * @param maxRetry Maximum number of retry attempts.
   * @param initialDelayMs Initial delay in milliseconds before retrying.
   * @returns Operator function to apply retry logic to an observable.
   */
  private retryBackoff<T>(maxRetry = 2, initialDelayMs = 300) {
    return (src: Observable<T>) =>
      src.pipe(
        retryWhen((errors) =>
          errors.pipe(
            concatMap((err, i) => {
              // i = número de retries já feitos (0, 1, ..., maxRetry)
              if (i === maxRetry) return throwError(() => err);
              const backoff = initialDelayMs * Math.pow(2, i);
              return timer(backoff);
            })
          )
        )
      );
  }

  /**
   * Fetches all available schemas from the API.
   * Retries the request on transient errors using exponential backoff.
   * @returns Observable emitting an array of Schema objects.
   */
  getSchemas(): Observable<Schema[]> {
    return this.http.get<Schema[]>(`${this.base}/schemas`).pipe(
      this.retryBackoff(2, 300),
      switchMap((schemas) =>
        schemas && schemas.length
          ? of(schemas)
          : this.http.get<Schema[]>('/assets/mocks/schemas.json')
      ),
      catchError(() => this.http.get<Schema[]>('/assets/mocks/schemas.json'))
    );
  }

  /**
   * Updates the value of a specific question for a given request.
   * Retries the request on transient errors using exponential backoff.
   * @param requestId The ID of the request to update.
   * @param questionId The ID of the question to update.
   * @param value The new value to set for the question.
   * @returns Observable emitting the update response.
   */
  updateQuestion(
    requestId: string,
    questionId: number,
    value: unknown
  ): Observable<UpdateResponse> {
    return this.http
      .put<UpdateResponse>(
        `${this.base}/requests/${requestId}/question/${questionId}`,
        { value }
      )
      .pipe(this.retryBackoff(2, 300));
  }

  /**
   * Busca um schema pelo requestType.
   * @param requestType Tipo do request.
   * @returns Observable emitindo o schema correspondente ou undefined.
   */
  getSchemaByType(requestType: string): Observable<Schema | undefined> {
    return this.getSchemas().pipe(
      map((schemas) => schemas.find((s) => s.id === requestType))
    );
  }
}
