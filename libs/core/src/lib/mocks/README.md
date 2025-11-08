# In-Memory Data Service (Mocks)

Provides a mock backend for Angular applications using [angular-in-memory-web-api](https://github.com/angular/in-memory-web-api). Useful for development and testing without a real backend.

## Features

- Simulates REST API endpoints for schemas and requests
- Loads mock schemas from `schemas.json`
- Simulates random failures for robustness testing (disabled by default)
- Custom endpoints for updating request answers

## Usage

1. Import and configure `InMemoryDataService` in your Angular app (usually in `AppModule`):

```ts
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'libs/core/src/lib/mocks/in-memory-data.service';

@NgModule({
  imports: [
    // ...other imports
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
  ],
})
export class AppModule {}
```

2. The service will provide the following collections and endpoints:

- `GET /api/schemas` — Returns all schemas from `schemas.json`
- `GET /api/software` — Returns the software schema
- `GET /api/hardware` — Returns the hardware schema
- `GET /api/requests` — Returns all requests
- `PUT /api/requests/:id/question/:questionId` — Updates an answer for a specific question in a request

## Custom Error Simulation

- The service can simulate random server errors for GET and PUT requests (currently disabled for development).
- To enable, set `maybeFail()` to return `true` randomly.

## Example Schema (schemas.json)

```json
[
  {
    "id": "software",
    "title": "Software Request",
    "icon": "apps",
    "sections": [
      {
        "id": "general",
        "title": "General Info",
        "fields": [
          { "id": 1, "label": "Name", "type": "text", "required": true },
          { "id": 2, "label": "License", "type": "text" }
        ]
      }
    ]
  }
]
```

## Example Request Update

```http
PUT /api/requests/req-123/question/1
Content-Type: application/json

{
  "value": "New Answer"
}
```

## File Structure

- `in-memory-data.service.ts` — Main mock service logic
- `schemas.json` — Example schemas for forms
- `index.ts` — Barrel file for exports

## References

- [angular-in-memory-web-api documentation](https://github.com/angular/in-memory-web-api)
