# Angular — Modern Template Control Flow

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
