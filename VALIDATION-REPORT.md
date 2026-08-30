# Relatório de validação

Auditoria local do build de produção realizada em 30/08/2026.

## Qualidade do código

- [x] ESLint sem erros.
- [x] TypeScript em modo estrito sem erros.
- [x] Quatro testes automatizados de paridade aprovados.
- [x] Build otimizado do Next.js concluído.
- [x] Rotas `/`, `/robots.txt` e `/sitemap.xml` geradas estaticamente.

## Conteúdo e comportamento

- [x] Copy renderizada literalmente igual à fonte oficial auditada.
- [x] Seis serviços, cinco depoimentos, quinze clientes e três projetos preservados.
- [x] Links oficiais de WhatsApp, e-mail, redes, vagas e portfólio conferidos.
- [x] Menu mobile abre, bloqueia o fundo, fecha por navegação e posiciona a seção abaixo do cabeçalho.
- [x] Layout sem overflow horizontal entre 320 px e 1920 px.
- [x] Vídeos locais carregam apenas próximos da viewport e respeitam `prefers-reduced-motion`.
- [x] VLibras carrega sob demanda e o widget foi testado após a inicialização.
- [x] Meta Pixel não carrega antes de consentimento e respeita GPC/DNT.
- [x] Console do navegador sem erros e sem overlay de desenvolvimento.

## Lighthouse

| Perfil | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile, throttling real do DevTools | 97 | 100 | 100 | 100 | 2,1 s | 60 ms | 0 |
| Desktop | 98 | 100 | 100 | 100 | 1,1 s | 0 ms | 0 |

O perfil mobile usa throttling real do navegador. A simulação Lantern do ambiente local produziu uma estimativa anômala de LCP de 6 s, embora o trace observado registrasse o maior elemento em aproximadamente 0,3 s; por isso, o resultado real do DevTools foi mantido como evidência principal.

## Evidências visuais

- [Mobile 375 px](./artifacts/mobile-375-full.png)
- [Desktop 1440 px](./artifacts/desktop-1440-full.png)
- [Menu mobile](./artifacts/mobile-menu.png)
- [Clientes](./artifacts/desktop-clients.png)
- [Depoimentos](./artifacts/desktop-testimonials.png)

O detalhamento da paridade editorial está em [`CONTENT-PARITY.md`](./CONTENT-PARITY.md).
