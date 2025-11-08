# NexUI Component Token Rules (For Cline)

## Padrão de Nomenclatura

Use apenas este padrão:

```
--nex-<component>-<part>-<property>[-state][-scale]
```

### Exemplos

```
--nex-radio-input-size
--nex-radio-input-border-color
--nex-button-label-disabled-opacity
--nex-switch-thumb-checked-bg
--nex-card-header-bg
```

---

## Regras Obrigatórias

- Sempre siga o padrão de nomenclatura acima.
- Sempre inclua o nome do componente.
- Sempre inclua a parte real do DOM (input, label, icon, header, thumb, track, tab, option, footer, content, box).
- Sempre coloque estados como sufixo: `checked`, `disabled`, `hover`, `focus`, `active`, `selected`, `pressed`.
- Sempre referencie tokens de cor semânticos (nunca cores cruas, exceto fallback).
- Sempre mantenha a consistência de nomes entre componentes.
- Sempre escolha o nome de parte mais claro e explícito.
- Sempre estruture tokens no nível do componente (padding, radius, gap, size).
- Sempre gere nomes de variáveis previsíveis.
- Sempre reutilize padrões de nomenclatura entre componentes similares (`input-size`, `thumb-size`, etc).

---

## Regras Proibidas

- Não use símbolos BEM (`__`, `--`) nos nomes das variáveis.
- Não omita o nome do componente.
- Não use nomes de partes abstratas (`control`, `indicator`, `wrapper`, `inner`, `shape`).
- Não use cores hardcoded (exceto fallback).
- Não invente novas estruturas de nomes.
- Não misture tokens semânticos e de componente.
- Não use nomes genéricos como `--padding`, `--bg`, `--color`.
- Não crie tokens que não mapeiam para uma parte do DOM.

---

## Estados Permitidos (exemplos)

```
checked
disabled
hover
focus
active
selected
pressed
error
```

---

## Partes Permitidas (exemplos)

```
input
label
thumb
track
icon
header
footer
content
item
tab
option
box
```

---

## Regras de Consistência

- Componentes similares devem compartilhar padrões de tokens.
- Radio/checkbox/switch devem alinhar nomes de input/box/thumb.
- Button/card/tabs devem alinhar nomes de header/footer/content/item.
- Tokens devem ser dedutíveis da estrutura do DOM.
- Tokens devem ser previsíveis a partir de padrões já usados.

---

## Resumo

Cline deve:

- seguir exatamente o padrão de tokens
- usar nomeação component-part-property
- sufixar estados
- evitar nomes vagos
- evitar sintaxe BEM
- referenciar tokens semânticos
- manter consistência em todo o sistema

O não cumprimento dessas regras não é permitido.
