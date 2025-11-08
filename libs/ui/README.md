# NexUI — UI Component Library

This library contains reusable Angular components focused on accessibility, flexibility, and forms integration.

## Available Components

---

### 1. Button

**Description:**  
A flexible and accessible button with support for themes, variants, sizes, light mode, loading, and icons.

[Component README](src/lib/components/button/README.md)

**Example:**

```html
<button nex-button [theme]="'primary'" [variant]="'solid'" [size]="'md'">
  <nex-icon icon="apps"></nex-icon>
  Apps
</button>
```

---

### 2. Card

**Description:**  
A visual container for grouping content, with slots for header, body, and footer.

[Component README](src/lib/components/card/README.md)

**Example:**

```html
<nex-card>
  <div nex-card-header>Title</div>
  <div nex-card-body>Main content</div>
  <div nex-card-footer>
    <button nex-button>Action</button>
  </div>
</nex-card>
```

---

### 3. Menu List

**Description:**  
A styled menu list, using the `nex-menu-item` attribute for each item.

[Component README](src/lib/components/menu-list/README.md)

**Example:**

```html
<nex-menu-list>
  <div nex-menu-item>Item 1</div>
  <div nex-menu-item>Item 2</div>
</nex-menu-list>
```

---

### 4. Checkbox

**Description:**  
Customizable checkbox integrated with Angular forms, supports label, states, and error slot.

[Component README](src/lib/components/form/checkbox/README.md)

**Example:**

```html
<nex-checkbox [label]="'Accept terms'" [checked]="true"></nex-checkbox>
```

---

### 5. Error

**Description:**  
Simple component to display error messages in forms.

[Component README](src/lib/components/form/error/README.md)

**Example:**

```html
<nex-error>Required field.</nex-error>
```

---

### 6. Input

**Description:**  
Flexible input field, supports multiple types, label, placeholder, states, and slots for label/error.

[Component README](src/lib/components/form/input/README.md)

**Example:**

```html
<nex-input [type]="'text'" [label]="'Name'"></nex-input>
```

---

### 7. Label

**Description:**  
Label that can be associated with form fields via `forId`.

[Component README](src/lib/components/form/label/README.md)

**Example:**

```html
<nex-label forId="email">Email</nex-label> <input id="email" type="email" />
```

---

### 8. Radio Group

**Description:**  
Radio button group integrated with Angular forms, supports label, custom options, and error slot.

[Component README](src/lib/components/form/radio-group/README.md)

**Example:**

```html
<nex-radio-group
  [options]="[
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]"
  [value]="selected"
></nex-radio-group>
```

---

### 9. Select

**Description:**  
Customizable select (dropdown), integrated with Angular forms, supports label, placeholder, options, and error slot.

[Component README](src/lib/components/form/select/README.md)

**Example:**

```html
<nex-select
  [options]="[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]"
  [value]="selected"
></nex-select>
```

---

## How to use

Import the desired modules and use the selectors as shown above. See each component's documentation for advanced details.
