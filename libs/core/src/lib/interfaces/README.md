# Form Schema Interfaces

Shared types and interfaces for dynamic form schemas.

## Types

### `FieldType`

```ts
type FieldType = 'text' | 'number' | 'radio';
```

Represents the type of a form field.

## Interfaces

### `Field`

```ts
interface Field {
  id: string | number;
  label: string;
  type: string;
  required?: boolean;
  name?: string;
  options?: Array<string | { value: string; label: string; icon?: string }>;
}
```

Represents a single form field.

- `id`: Unique identifier for the field.
- `label`: Display label for the field.
- `type`: Field type (e.g., 'text', 'number', 'radio').
- `required`: Whether the field is required.
- `name`: Optional field name.
- `options`: For fields like radio/select, possible options.

### `Section`

```ts
interface Section {
  id: string;
  title: string;
  fields: Field[];
}
```

Represents a section of a form, grouping multiple fields.

- `id`: Unique identifier for the section.
- `title`: Section title.
- `fields`: Array of fields in the section.

### `Schema`

```ts
interface Schema {
  id: string;
  title: string;
  icon: string;
  sections: Section[];
}
```

Represents the overall form schema.

- `id`: Unique identifier for the schema.
- `title`: Schema title.
- `icon`: Icon name for the schema.
- `sections`: Array of sections in the schema.

### `RequestData`

```ts
interface RequestData {
  id: string;
  answers: Record<number, unknown>;
}
```

Represents submitted form data.

- `id`: Schema or request identifier.
- `answers`: Map of field IDs to user answers.

## Example

```ts
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

const request: RequestData = {
  id: 'user-profile',
  answers: {
    1: 'Alice',
    2: 30,
    3: 'Female',
  },
};
```
