# Schema Service

Service for handling schema-related API operations in Angular applications.

## Features

- Fetches all available schemas from the backend
- Updates answers for specific questions in a request
- Fetches a schema by request type
- Implements exponential backoff retry strategy for transient HTTP errors

## Usage

Inject `SchemaService` into your component or service:

```ts
import { SchemaService } from 'libs/core/src/lib/services/schema.service';

constructor(private schemaService: SchemaService) {}
```

### Fetch all schemas

```ts
this.schemaService.getSchemas().subscribe((schemas) => {
  // Handle array of Schema objects
});
```

### Update a question's answer

```ts
this.schemaService.updateQuestion('req-123', 1, 'New Answer').subscribe((resp) => {
  // resp: { id: string, updated: Record<number, unknown> }
});
```

### Fetch a schema by type

```ts
this.schemaService.getSchemaByType('software').subscribe((schema) => {
  // schema: Schema | undefined
});
```

## API

### Methods

| Method                                                                                              | Description                                               |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `getSchemas(): Observable<Schema[]>`                                                                | Fetches all schemas from `/api/schemas` with retry logic. |
| `updateQuestion(requestId: string, questionId: number, value: unknown): Observable<UpdateResponse>` | Updates a specific question's answer for a request.       |
| `getSchemaByType(requestType: string): Observable<Schema \| undefined>`                             | Fetches a schema by its type/id.                          |

### Retry Strategy

All HTTP requests use exponential backoff retry (2 attempts, starting at 300ms).

## Types

### `UpdateResponse`

```ts
interface UpdateResponse {
  id: string;
  updated: Record<number, unknown>;
}
```

## File Structure

- `schema.service.ts` — Main service logic
- `schema.service.spec.ts` — Unit tests
- `index.ts` — Barrel file for exports
