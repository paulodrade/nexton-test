# Angular — Migration Cheatsheet

## 2) Migration Cheatsheet

| Legacy                                          | Modern                                                           | Notes                                 |
| ----------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| `*ngIf="cond; else tpl"`                        | `@if (cond) { … } @else { … }`                                   | Inline, menos templates               |
| `*ngFor="let x of xs; index as i; trackBy: tb"` | `@for (x of xs; track tb(x); let i = $index) { … } @empty { … }` | Usar expressão `track`                |
| `[ngSwitch]="v"` + `*ngSwitchCase`              | `@switch (v) { @case ('a') {…} @default {…} }`                   | Branches localizados                  |
| –                                               | `@defer`                                                         | Substitui IntersectionObserver/manual |
| –                                               | `@let`                                                           | Substitui getters extras/as chains    |

**Regras mecânicas:**

- Remover microsyntax `*`; converter para block keywords.
- Extrair contexto compartilhado via `@let` ao invés de duplicar pipes/getters.
- Converter `trackBy: trackById` → `track item.id` ou `track trackById(item)`.
