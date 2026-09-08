export type CaseMedia =
  | {
      readonly kind: "image";
      readonly src: string;
      readonly alt: string;
    }
  | {
      readonly kind: "video";
      readonly src: string;
      readonly poster: string;
      readonly alt: string;
    };

export type CaseGalleryBlock =
  | {
      readonly kind: "full" | "portrait" | "device" | "video";
      readonly media: CaseMedia;
      readonly caption?: string;
    }
  | {
      readonly kind: "split";
      readonly media: readonly [CaseMedia, CaseMedia];
      readonly caption?: string;
    };

type CaseBase = {
  readonly order: number;
  readonly title: string;
  readonly segment: string;
  readonly services: readonly string[];
  readonly summary: string;
  readonly featured: boolean;
};

export type PublishedCase = CaseBase & {
  readonly status: "published";
  readonly slug: string;
  readonly period: string;
  readonly context: string;
  readonly role: string;
  readonly hero: CaseMedia;
  readonly results?: readonly string[];
  readonly gallery: readonly CaseGalleryBlock[];
};

export type CuratingCase = CaseBase & {
  readonly status: "curating";
  readonly slug: null;
  readonly curatorialLabel: "Conteúdo em curadoria";
  readonly artwork: "brand" | "technology";
};

export type CaseCatalogItem = PublishedCase | CuratingCase;

export const casesCatalog: readonly CaseCatalogItem[] = [
  {
    order: 1,
    status: "published",
    slug: "sana-2025-kabum",
    title: "SANA 2025 — KaBuM!",
    segment: "Entretenimento e cultura geek",
    services: ["Cobertura audiovisual"],
    summary:
      "Registro audiovisual da participação da KaBuM! no SANA 2025, em Fortaleza.",
    featured: true,
    period: "2025",
    context:
      "O SANA reúne comunidades, marcas e experiências ligadas à cultura geek em Fortaleza. A cobertura registrou a presença da KaBuM! no evento.",
    role:
      "A DYZZI realizou a cobertura audiovisual do projeto, com captação e edição orientadas para conteúdo digital.",
    hero: {
      kind: "image",
      src: "/projects/kabum-sana-2025-poster.webp",
      alt: "Cobertura audiovisual da KaBuM! no SANA 2025",
    },
    gallery: [
      {
        kind: "video",
        media: {
          kind: "video",
          src: "/projects/kabum-sana-2025.mp4",
          poster: "/projects/kabum-sana-2025-poster.webp",
          alt: "Vídeo da cobertura audiovisual da KaBuM! no SANA 2025",
        },
        caption: "Cobertura audiovisual · SANA 2025",
      },
    ],
  },
  {
    order: 2,
    status: "curating",
    slug: null,
    title: "Case em curadoria 02",
    segment: "Branding e conteúdo",
    services: ["Gestão de marca", "Produção de conteúdo"],
    summary:
      "A estrutura está pronta para receber imagens, contexto e entregas do projeto selecionado.",
    featured: false,
    curatorialLabel: "Conteúdo em curadoria",
    artwork: "brand",
  },
  {
    order: 3,
    status: "curating",
    slug: null,
    title: "Case em curadoria 03",
    segment: "Tecnologia e automação",
    services: ["Sistemas", "Automações"],
    summary:
      "A estrutura está pronta para receber interfaces, fluxos e materiais do projeto selecionado.",
    featured: false,
    curatorialLabel: "Conteúdo em curadoria",
    artwork: "technology",
  },
] as const;

export const publishedCases = casesCatalog.filter(
  (item): item is PublishedCase => item.status === "published",
);

export function getPublishedCase(slug: string) {
  return publishedCases.find((item) => item.slug === slug);
}
