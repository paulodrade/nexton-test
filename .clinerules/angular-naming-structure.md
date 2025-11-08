# Angular — Naming & Structure

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
