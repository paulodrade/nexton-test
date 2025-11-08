# Angular — Versions & Tooling

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

## 3) Component & Router Defaults

- Standalone por padrão (`standalone: true`)
- Signals first (`signal`, `computed`, `effect`)
- Inputs/Outputs: preferir signal APIs
- Providers funcionais: `provideHttpClient(withFetch())`, `provideRouter(routes, withComponentInputBinding())`
- Guards/Resolvers: `CanActivateFn`/`ResolveFn`
- Hydration & SSR: usar `provideClientHydration()` quando necessário

## 8) Back-Compatibility

- Templates legados podem existir; migrar para blocks ao alterar.
- Terceiros com diretivas estruturais: limitar uso a shims/adapters standalone.
