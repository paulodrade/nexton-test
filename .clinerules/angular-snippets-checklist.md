# Angular — Snippet Library & PR Checklist

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
