# Core Library

This library provides core types, services, mocks, and utilities for schema-driven forms and data processing in Angular applications.

## Modules

---

### 1. Interfaces

**Description:**  
Shared TypeScript types and interfaces for dynamic form schemas.

[Module README](src/lib/interfaces/README.md)

**Example:**

```ts
import { Schema, Field, Section, RequestData } from 'libs/core/src/lib/interfaces/form-schema.interfaces';

const schema: Schema = {
  id: 'user-profile',
  title: 'User Profile',
  icon: 'user',
  sections: [
    {
      id: 'personal',
      title: 'Personal Info',
      fields: [
        { id: 1, label: 'Name', type: 'text', required: true },
        { id: 2, label: 'Age', type: 'number' },
        { id: 3, label: 'Gender', type: 'radio', options: ['Male', 'Female'] },
      ],
    },
  ],
};
```

---

### 2. Mocks

**Description:**  
In-memory mock backend for development and testing, simulating REST API endpoints for schemas and requests.

[Module README](src/lib/mocks/README.md)

**Example:**

```ts
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'libs/core/src/lib/mocks/in-memory-data.service';

@NgModule({
  imports: [HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 })],
})
export class AppModule {}
```

---

### 3. Services

**Description:**  
Service for fetching schemas and updating request answers, with retry logic for HTTP errors.

[Module README](src/lib/services/README.md)

**Example:**

```ts
import { SchemaService } from 'libs/core/src/lib/services/schema.service';

constructor(private schemaService: SchemaService) {}

this.schemaService.getSchemas().subscribe((schemas) => {
  // Handle schemas
});
```

---

### 4. Utils

**Description:**  
Utility functions for form and data processing, such as string normalization.

[Module README](src/lib/utils/README.md)

**Example:**

```ts
import { normalizeName } from 'libs/core/src/lib/utils/normalize-name';

const raw = 'User Name-Árvore!';
const normalized = normalizeName(raw);
// Result: 'usernamearvore'
```

---

## How to use

Import the desired modules, types, or functions as needed in your Angular application. See each module's documentation for advanced usage and API details.
