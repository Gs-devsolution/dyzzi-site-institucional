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
  readonly contextLabel:
    | "Cliente"
    | "Marca no projeto"
    | "Aplicação"
    | "Projeto"
    | "Status";
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
    id: "technology-slot-01",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "finance",
    size: "compact",
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
    id: "technology-slot-02",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "automation",
    size: "wide",
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
    id: "technology-slot-03",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "ledger",
    size: "medium",
  },
  {
    id: "technology-slot-04",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "dashboard",
    size: "compact",
  },
  {
    id: "technology-slot-05",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "integration",
    size: "compact",
  },
  {
    id: "technology-slot-06",
    discipline: "technology",
    title: "Em breve",
    service: "Projeto em curadoria",
    contextLabel: "Status",
    context: "Conteúdo em preparação",
    kind: "graphic",
    artwork: "health",
    size: "compact",
  },
] as const;
