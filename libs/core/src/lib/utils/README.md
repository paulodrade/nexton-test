# Utils

Utility functions for form and data processing.

## normalizeName

Normalizes a string for use as a form control name.

### Signature

```ts
function normalizeName(str: string): string;
```

### Description

- Removes accents and diacritics
- Removes special characters and spaces
- Converts to lowercase
- Returns a string suitable for use as a form control name or HTML attribute

### Example

```ts
import { normalizeName } from 'libs/core/src/lib/utils/normalize-name';

const raw = 'Nome do Usuário-Árvore!';
const normalized = normalizeName(raw);
// Result: 'nomedousuarioarvore'
```

### Use Cases

- Generating safe `name` attributes for form controls
- Normalizing user input for consistent processing
