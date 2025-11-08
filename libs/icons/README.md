# Icons Library

This library provides the `<nex-icon>` component for rendering SVG and image icons in Angular applications.

## Available Icons

The following icons are available (SVG):

- `apps`
- `chevron-down`
- `refresh`
- `servers`

## Component

---

### 1. Icon

**Description:**  
Reusable icon component that loads SVG or image assets by name, with optional spinning animation.

**Inputs:**

| Name | Type                                               | Default | Description                              |
| ---- | -------------------------------------------------- | ------- | ---------------------------------------- |
| icon | 'apps' \| 'chevron-down' \| 'refresh' \| 'servers' | —       | Name of the icon to display              |
| type | 'svg' \| 'png' \| 'jpg'                            | 'svg'   | Asset type                               |
| spin | boolean                                            | false   | Enables spinning animation (for loaders) |

**Example:**

```html
<nex-icon icon="apps"></nex-icon>
<nex-icon icon="refresh" [spin]="true"></nex-icon>
<nex-icon icon="servers" type="svg"></nex-icon>
```

**How it works:**

- Loads the icon asset from `assets/icons/{type}/{icon}.{type}`.
- Supports SVG, PNG, and JPG formats.
- The `spin` input adds a CSS animation for loading indicators.

---

## How to use

Import the `IconModule` and use the `<nex-icon>` selector in your templates. Place your icon assets in the appropriate `assets/icons` subfolders.
