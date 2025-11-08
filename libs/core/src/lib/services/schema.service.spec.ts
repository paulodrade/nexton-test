// Angular/Jest unit test for SchemaService

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SchemaService, UpdateResponse } from './schema.service';
import { Schema } from '../interfaces/form-schema.interfaces';

describe('SchemaService', () => {
  let service: SchemaService;
  let http: { get: jest.Mock; put: jest.Mock };

  beforeEach(() => {
    http = {
      get: jest.fn(),
      put: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [SchemaService, { provide: HttpClient, useValue: http }],
    });
    service = TestBed.inject(SchemaService);
  });

  it('should fetch schemas via GET', (done) => {
    const mockSchemas: Schema[] = [{ id: 'foo' } as Schema];
    http.get.mockReturnValue(of(mockSchemas));

    service.getSchemas().subscribe((schemas) => {
      expect(schemas).toEqual(mockSchemas);
      expect(http.get).toHaveBeenCalledWith('/api/schemas');
      done();
    });
  });

  it('should update question via PUT', (done) => {
    const mockResponse: UpdateResponse = { id: '1', updated: { 2: 'bar' } };
    http.put.mockReturnValue(of(mockResponse));

    service.updateQuestion('1', 2, 'bar').subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(http.put).toHaveBeenCalledWith('/api/requests/1/question/2', {
        value: 'bar',
      });
      done();
    });
  });

  it('should fetch schema by type', (done) => {
    const mockSchemas: Schema[] = [
      { id: 'foo' } as Schema,
      { id: 'bar' } as Schema,
    ];
    http.get.mockReturnValue(of(mockSchemas));

    service.getSchemaByType('bar').subscribe((schema) => {
      expect(schema).toEqual({ id: 'bar' } as Schema);
      done();
    });
  });

  it('should retry on transient error and succeed', async () => {
    const { defer, of, throwError } = require('rxjs');
    let callCount = 0;
    const responses = [false, false, true];
    http.get.mockImplementation(() =>
      defer(() => {
        callCount++;
        if (responses[callCount - 1]) {
          return of([{ id: 'ok' }]);
        } else {
          return throwError(() => new Error('fail'));
        }
      })
    );

    await new Promise<void>((resolve) => {
      service.getSchemas().subscribe((schemas) => {
        expect(schemas).toEqual([{ id: 'ok' }]);
        expect(callCount).toBe(3);
        resolve();
      });
    });
  }, 10000);

  it('should throw error after max retries', async () => {
    const { defer, throwError } = require('rxjs');
    let callCount = 0;
    http.get.mockImplementation(() =>
      defer(() => {
        callCount++;
        return throwError(() => new Error('fail'));
      })
    );

    await new Promise<void>((resolve) => {
      service.getSchemas().subscribe({
        next: () => {
          throw new Error('Should not emit value');
        },
        error: (err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('fail');
          expect(callCount).toBe(3);
          resolve();
        },
      });
    });
  }, 10000);
});
