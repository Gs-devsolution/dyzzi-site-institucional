# Site Institucional DYZZI

Landing page institucional da Agência DYZZI, construída com Next.js 16, React 19 e TypeScript em modo estrito.

## Fontes de verdade

- Copy e links: [site oficial da Agência DYZZI](https://www.agenciadyzzi.com.br/)
- Identidade: arquivos oficiais fornecidos pela agência
- Portfólio externo: [portfolio.agenciadyzzi.com.br](https://portfolio.agenciadyzzi.com.br/)

Toda a copy visível está centralizada em `src/content/site-content.ts`. O teste `tests/content-parity.test.ts` bloqueia alterações acidentais na copy congelada, nas contagens editoriais, nos links e nos ativos locais obrigatórios.

## Desenvolvimento

```bash
npm install
copy .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Validação

```bash
npm run check
```

O comando executa ESLint, TypeScript, paridade de conteúdo e build de produção.

## Variável pública

```env
NEXT_PUBLIC_META_PIXEL_ID=1875213653406048
```

O Meta Pixel preserva somente `PageView`, respeita Global Privacy Control/Do Not Track e só inicializa quando `localStorage["dyzzi-analytics-consent"]` tem o valor `granted` ou quando o evento `dyzzi:analytics-consent` é disparado com `detail: "granted"`. O VLibras é carregado sob demanda, pelo script oficial, quando a pessoa aciona o botão de acessibilidade.

## Mídia

Os três vídeos oficiais são servidos localmente em MP4 H.264 com `faststart`, sem áudio e com posters próprios. Imagens e logos abaixo da dobra usam otimização nativa do Next.js.

O resultado consolidado da auditoria está em [`VALIDATION-REPORT.md`](./VALIDATION-REPORT.md).
