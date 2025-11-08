# NextonTest

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Global Requirements

- **Node.js v20+**  
  Download and install from [nodejs.org](https://nodejs.org/).

- **npm v9.12.3+**  
  Comes bundled with Node.js. Check version with:

  ```sh
  npm -v
  ```

- **Nx CLI (optional)**  
  Install globally:

  ```sh
  npm install -g nx
  ```

  Or use with `npx nx` (no global install needed).

- **Angular CLI (optional)**  
  Install globally:
  ```sh
  npm install -g @angular/cli
  ```
  Or use with `npx ng` (no global install needed).

## Installation

```sh
npm install
```

## Running apps/web

```sh
npx nx serve web
```

Access: [http://localhost:4200](http://localhost:4200)

## Tests

To run tests for a specific app or library:

```sh
npx nx test web
npx nx test ui
npx nx test core
npx nx test icons
```

To run all tests at once:

```sh
npx nx run-many --target=test --all
```

## Library Documentation

This project includes a custom Design System based on the following Figma file (only the components actually used in the project were implemented):

Design System:  
https://www.figma.com/design/ybuM0rl38f6qlcSGlKwdLK/Design-System--Temporary-?node-id=4597-2136&t=f5c07LgPuLykOHOs-1  
Password: Procurement

- [UI Library (libs/ui)](libs/ui/README.md): Angular UI components (forms, layout, etc)
- [Core Library (libs/core)](libs/core/README.md): Types, services, mocks, and utilities for schema-driven forms
- [Icons Library (libs/icons)](libs/icons/README.md): SVG/icon component and assets
- [Themes Guide (libs/ui/src/themes)](libs/ui/src/themes/README.md): How to create and customize NexUI themes

---

✨ This workspace uses [Nx](https://nx.dev) for Angular monorepo management. See the [Nx documentation](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) for more details.
