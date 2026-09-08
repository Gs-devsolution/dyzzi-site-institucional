export type PortfolioDiscipline = "communication" | "technology";

export type PortfolioArtwork =
  | "finance"
  | "automation"
  | "ledger"
  | "dashboard"
  | "integration"
  | "health";

type PortfolioBaseItem = {
  readonly id: string;
  readonly discipline: PortfolioDiscipline;
  readonly title: string;
  readonly service: string;
  readonly contextLabel: "Cliente" | "Marca no projeto" | "Aplicação" | "Projeto";
  readonly context: string;
  readonly size: "wide" | "medium" | "compact";
  readonly href?: string;
};

export type PortfolioMediaItem = PortfolioBaseItem & {
  readonly kind: "media";
  readonly poster: string;
  readonly artwork?: never;
};

export type PortfolioGraphicItem = PortfolioBaseItem & {
  readonly kind: "graphic";
  readonly artwork: PortfolioArtwork;
  readonly poster?: never;
};

export type PortfolioItem = PortfolioMediaItem | PortfolioGraphicItem;

export const portfolioItems: readonly PortfolioItem[] = [
  {
    id: "kabum-sana-2025",
    discipline: "communication",
    title: "SANA 2025",
    service: "Cobertura audiovisual",
    contextLabel: "Cliente",
    context: "KaBuM!",
    kind: "media",
    poster: "/projects/kabum-sana-2025-poster.webp",
    size: "wide",
  },
  {
    id: "solvi",
    discipline: "technology",
    title: "Solvi",
    service: "Produto digital",
    contextLabel: "Projeto",
    context: "Produto próprio",
    kind: "graphic",
    artwork: "finance",
    size: "compact",
    href: "https://solvi.app.br/",
  },
  {
    id: "dove-uv-repair",
    discipline: "communication",
    title: "UV Repair & Glow + Ferúlico",
    service: "Ativação de marca",
    contextLabel: "Marca no projeto",
    context: "Dove",
    kind: "media",
    poster: "/projects/activation-case-01-poster.webp",
    size: "compact",
  },
  {
    id: "automacao-fiscal-operacional",
    discipline: "technology",
    title: "Automação Fiscal e Operacional",
    service: "Sistemas e automações",
    contextLabel: "Aplicação",
    context: "Operação fiscal e contábil",
    kind: "graphic",
    artwork: "automation",
    size: "wide",
    href: "https://www.gslab.dev.br/projetos/solucoes/automacao-fiscal-operacional",
  },
  {
    id: "brahma-rua-n1",
    discipline: "communication",
    title: "Rua Nº1 — Copa 2026",
    service: "Cobertura audiovisual",
    contextLabel: "Marca no projeto",
    context: "Brahma",
    kind: "media",
    poster: "/projects/audiovisual-case-03-poster.webp",
    size: "medium",
  },
  {
    id: "importacao-contabil",
    discipline: "technology",
    title: "Importação de Movimentações Contábeis",
    service: "Sistemas e automações",
    contextLabel: "Aplicação",
    context: "Operações contábeis e ERP",
    kind: "graphic",
    artwork: "ledger",
    size: "medium",
  },
  {
    id: "dashboards-operacionais",
    discipline: "technology",
    title: "Dashboards e Relatórios Operacionais",
    service: "Dados e indicadores",
    contextLabel: "Aplicação",
    context: "Análise e tomada de decisão",
    kind: "graphic",
    artwork: "dashboard",
    size: "compact",
  },
  {
    id: "integracoes-empresariais",
    discipline: "technology",
    title: "Integrações Empresariais",
    service: "Integrações e workflows",
    contextLabel: "Aplicação",
    context: "APIs, CRM, ERP e automações",
    kind: "graphic",
    artwork: "integration",
    size: "compact",
  },
  {
    id: "lp-medico",
    discipline: "technology",
    title: "LP para Médico",
    service: "Desenvolvimento web",
    contextLabel: "Projeto",
    context: "Demonstração conceitual",
    kind: "graphic",
    artwork: "health",
    size: "compact",
    href: "https://www.gslab.dev.br/projetos/lp/medico_01",
  },
] as const;
