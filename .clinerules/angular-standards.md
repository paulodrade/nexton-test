# Cline Playbook — Angular v19+ Control Flow & Project Version Rules

## 0) Versions & Tooling

- **Angular**: `~20.3.0` para `@angular/*`
- **Nx**: `22.0.2`
- **TypeScript**: `~5.9.2`
- **RxJS**: `~7.8.0`
- **Zone.js**: `~0.15.0`
- **Node**: 20+
- **npm**: `9.12.3`
- **ESLint**: 9.x
- **Builder**: Angular build (Vite pipeline). Preferir standalone APIs.

**Defaults:**

- Standalone components, `provideRouter`, providers funcionais.
- Deferred loading com `@defer`.
- Control-flow blocks (`@if/@for/@switch/@defer/@let`).

---

## 1) Modern Template Control Flow

### 1.1 `@if / @else if / @else`

```html
@if (isReady()) {
<app-ready />
} @else if (isLoading) {
<app-skeleton />
} @else {
<app-error [err]="error" />
}
```

**Regras:** Usar forma block para ramificações, evitar `<ng-template>`, extrair condições complexas para getters/signals.

---

### 1.2 `@for` (substitui `*ngFor`)

```html
@for (user of users(); track user.id; let i = $index; let first = $first; let last = $last; let count = $count; let even = $even) {
<app-user-row [user]="user" [row]="i" [isFirst]="first" [isLast]="last" />
} @empty {
<app-empty-state />
}
```

---

### 1.3 `@switch / @case / @default`

```html
@switch (status()) { @case ('loading') { <app-skeleton /> } @case ('ready') { <app-dashboard /> } @case ('error') { <app-error [err]="error()" /> } @default { <app-unknown /> } }
```

---

### 1.4 `@defer`

```html
@defer (on viewport; prefetch on idle) {
<app-heavy-widget />
} @placeholder {
<app-skeleton />
} @loading {
<app-skeleton />
} @error (let e) {
<app-error [err]="e" />
}
```

---

### 1.5 `@let`

```html
@let vm = userVm(); @if (vm.user as u) {
<h3>{{ u.name }}</h3>
@if (vm.meta as m) { <small>{{ m.createdAt | date }}</small> } }
```

---

## 2) Migration Cheatsheet

| Legacy                                          | Modern                                                           | Notes                                 |
| ----------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| `*ngIf="cond; else tpl"`                        | `@if (cond) { … } @else { … }`                                   | Inline, menos templates               |
| `*ngFor="let x of xs; index as i; trackBy: tb"` | `@for (x of xs; track tb(x); let i = $index) { … } @empty { … }` | Usar expressão `track`                |
| `[ngSwitch]="v"` + `*ngSwitchCase`              | `@switch (v) { @case ('a') {…} @default {…} }`                   | Branches localizados                  |
| –                                               | `@defer`                                                         | Substitui IntersectionObserver/manual |
| –                                               | `@let`                                                           | Substitui getters extras/as chains    |

---

## 3) Component & Router Defaults

- Standalone por padrão (`standalone: true`)
- Signals first (`signal`, `computed`, `effect`)
- Inputs/Outputs: preferir signal APIs
- Providers funcionais: `provideHttpClient(withFetch())`, `provideRouter(routes, withComponentInputBinding())`
- Guards/Resolvers: `CanActivateFn`/`ResolveFn`
- Hydration & SSR: usar `provideClientHydration()` quando necessário

---

## 4) Testing & Lint

- Jest + jest-preset-angular 14.6
- Preferir Component Test Harnesses
- Helpers tipo Harness para standalone
- Lint: sem microsyntax legacy, preferir `@for` com `track`, templates declarativos e puros

---

## 5) Snippet Library

**If/Else chain**

```html
@if (vm.error) { <app-error [err]="vm.error" /> } @else if (vm.loading){ <app-skeleton /> } @else { <app-content [data]="vm.data" /> }
```

**List with empty state**

```html
@for (item of items(); track item.id) {
<app-row [item]="item" />
} @empty {
<app-empty-state />
}
```

**Switch**

```html
@switch (mode()) { @case ('create') { <app-create /> } @case ('edit') { <app-edit /> } @default { <app-readonly /> } }
```

**Defer com placeholder/loading/error**

```html
@defer (on viewport; prefetch on idle) {
<charts-dashboard />
} @placeholder { <charts-skeleton /> } @loading { <charts-skeleton /> } @error (let e) { <app-error [err]="e" /> }
```

**Let + aliases**

```html
@let vm = dashboardVm(); @if (vm.user as u) {
<h2>{{ u.name }}</h2>
@if (vm.stats as s) { <stats-panel [value]="s" /> } }
```

---

## 6) PR Checklist

- [ ] Usa apenas `@if/@for/@switch/@defer/@let` (sem novos `*ngIf/*ngFor/*ngSwitch*`)
- [ ] Listas com `track` ou dados imutáveis
- [ ] Widgets pesados com `@defer` e placeholders
- [ ] Componentes standalone + providers funcionais
- [ ] Versões consistentes (Angular 20.3.x, TS 5.9.x, RxJS 7.8.x)
- [ ] Testes atualizados (Jest preset 14.6)

---

## 7) Naming & Structure

**Style:** kebab-case + sufixo Angular

Exemplo:

- `user-card.component.ts`
- `user-card.component.html`
- `user-card.component.scss`

**Estrutura recomendada:**

```
feature/
  components/
    user-card/
      user-card.component.ts
      user-card.component.html
      user-card.component.scss
      user-card.component.spec.ts
      user-card.component.stories.ts
  routes/
    feature.routes.ts
  services/
    user.service.ts
  models/
    user.model.ts
  store/
    cart.store.ts
  utils/
    format.utils.ts
  index.ts
```

**Regras:**

- Sempre kebab-case
- Um artefato principal por arquivo
- Sufixos obrigatórios
- Co-locar template/style/test/story
- Barrel files só em libs

**Comandos de scaffolding:**

```bash
npm nx g @nx/angular:component feature/user/user-card --standalone --project=apps-web --style=scss --directory=components
npm nx g @nx/angular:directive feature/shared/auto-focus --standalone --project=apps-web
npm nx g @nx/angular:service feature/user/user --project=apps-web
echo "import { Routes } from '@angular/router'; export const routes: Routes = [];" > src/app/feature/account/account.routes.ts
```

---

## 8) Back-Compatibility

- Templates legados podem existir; migrar para blocks ao alterar.
- Terceiros com diretivas estruturais: limitar uso a shims/adapters standalone.
