# NexUI — Custom Themes

This directory contains the available themes for NexUI components. Each theme is organized in its own folder (e.g., `dark/`), including tokens, component SCSS files, and a main `themes.scss` entry point.

## How to create a new theme

### 1. Create a new folder

Create a new folder under `libs/ui/src/themes`, for example: `light/`.

### 2. Copy the structure from the `dark` theme

Your new theme folder should contain:

- `themes.scss` (entrypoint for all imports)
- `components/` (one SCSS file per component, e.g., `button.scss`, `card.scss`, etc.)
- `tokens/_base.scss` (base tokens: spacing, radius, etc.)
- `tokens/_semantic.<theme>.scss` (semantic color tokens for your theme)

### 3. Define tokens

- In `tokens/_base.scss`, define base tokens (e.g., spacing, border-radius).
- In `tokens/_semantic.<theme>.scss`, define semantic color tokens (e.g., `--nex-color-primary`, `--nex-theme-bg`).

### 4. Implement component SCSS

- Each file in `components/` should define CSS variables for the component, following the pattern:
  ```
  --nex-<component>-<part>-<property>[-state][-scale]
  ```
- Example for button:
  ```scss
  :root {
    --nex-button-label-color: var(--nex-color-on-primary);
    --nex-button-label-disabled-opacity: 0.5;
    --nex-button-bg: var(--nex-color-primary);
    --nex-button-bg-hover: var(--nex-color-primary-hover);
  }
  ```

### 5. Create the `themes.scss` entrypoint

Your `themes.scss` should:

- Import both token files:
  ```scss
  @import './tokens/_base.scss';
  @import './tokens/_semantic.light.scss';
  ```
- Import all component SCSS files:
  ```scss
  @import './components/button.scss';
  @import './components/checkbox.scss';
  @import './components/input.scss';
  @import './components/radio.scss';
  @import './components/card.scss';
  @import './components/select.scss';
  @import './components/label.scss';
  @import './components/menu-list.scss';
  ```
- Apply global theme styles using a body class:
  ```scss
  body.nex-theme-light {
    background: var(--nex-theme-bg);
    color: var(--nex-color-fg-default);
  }
  ```

### 6. Apply the theme in your app

- Add the corresponding theme class to your `<body>` element (e.g., `nex-theme-dark` or `nex-theme-light`) to activate the theme variables and global styles.

### 7. Best practices

- Never use hardcoded colors in component styles; always use tokens.
- Follow the NexUI token naming convention strictly.
- Keep the structure and import order consistent with the `dark` theme for maintainability.
- Use the files in `libs/ui/src/themes/dark` as a reference for new themes.

## Example theme structure

```
light/
  themes.scss
  components/
    button.scss
    card.scss
    ...
  tokens/
    _base.scss
    _semantic.light.scss
```

## Example `themes.scss`

```scss
// NexUI Theme Entrypoint

// =========================
// TOKENS
// =========================
@import './tokens/_base.scss';
@import './tokens/_semantic.light.scss';

// =========================
// COMPONENTS
// =========================
@import './components/button.scss';
@import './components/checkbox.scss';
@import './components/input.scss';
@import './components/radio.scss';
@import './components/card.scss';
@import './components/select.scss';
@import './components/label.scss';
@import './components/menu-list.scss';

body.nex-theme-light {
  background: var(--nex-theme-bg);
  color: var(--nex-color-fg-default);
}
```
