"use client";

import Image from "next/image";
import { useState } from "react";
import { Arrow } from "@/components/arrow";
import type {
  PortfolioArtwork,
  PortfolioDiscipline,
  PortfolioItem,
} from "@/content/portfolio";
import styles from "@/components/portfolio-gallery.module.css";

type PortfolioFilter = "all" | PortfolioDiscipline;

const filters: readonly { label: string; value: PortfolioFilter }[] = [
  { label: "Todos", value: "all" },
  { label: "Comunicação", value: "communication" },
  { label: "Tecnologia", value: "technology" },
];

const disciplineLabels: Record<PortfolioDiscipline, string> = {
  communication: "Comunicação",
  technology: "Tecnologia",
};

function PortfolioArtworkGraphic({ artwork }: { artwork: PortfolioArtwork }) {
  const common = (
    <>
      <circle cx="184" cy="132" r="102" className={styles.orbit} />
      <circle cx="184" cy="132" r="70" className={styles.orbitSoft} />
      <path d="M28 216H340" className={styles.guide} />
      <circle cx="320" cy="40" r="5" className={styles.accent} />
    </>
  );

  const drawings: Record<PortfolioArtwork, React.ReactNode> = {
    finance: (
      <>
        <path d="M82 180V128M126 180V92M170 180V118M214 180V62M258 180V102" />
        <path d="m72 101 52-30 43 20 73-48 46 17" className={styles.lilacStroke} />
        <circle cx="240" cy="43" r="7" className={styles.accentFill} />
      </>
    ),
    automation: (
      <>
        <rect x="88" y="62" width="192" height="128" rx="22" />
        <path d="M120 100h128M120 130h76M120 160h98" />
        <circle cx="247" cy="130" r="26" className={styles.lilacStroke} />
        <path d="m247 116 12 21-25-1Z" className={styles.accentFill} />
      </>
    ),
    ledger: (
      <>
        <path d="M101 58h166v148H101z" />
        <path d="M128 91h111M128 122h111M128 153h74M128 181h47" />
        <path d="M218 153h21v28h-21z" className={styles.lilacStroke} />
        <circle cx="267" cy="58" r="7" className={styles.accentFill} />
      </>
    ),
    dashboard: (
      <>
        <rect x="72" y="58" width="224" height="150" rx="19" />
        <path d="M100 92h62v42h-62zM178 92h89M178 118h68M100 157h50v26h-50zM166 157h101v26H166z" />
        <path d="m188 111 20-8 19 4 29-19" className={styles.lilacStroke} />
        <circle cx="256" cy="88" r="6" className={styles.accentFill} />
      </>
    ),
    integration: (
      <>
        <circle cx="112" cy="132" r="38" />
        <circle cx="256" cy="86" r="31" />
        <circle cx="248" cy="180" r="27" />
        <path d="m148 119 78-25M147 147l74 25M256 117l-6 36" className={styles.lilacStroke} />
        <circle cx="112" cy="132" r="7" className={styles.accentFill} />
      </>
    ),
    health: (
      <>
        <path d="M184 198s-91-52-91-104c0-29 21-48 49-48 18 0 34 10 42 25 9-15 24-25 43-25 28 0 49 19 49 48 0 52-92 104-92 104Z" />
        <path d="M105 126h45l15-31 29 63 19-40 14 8h37" className={styles.lilacStroke} />
        <circle cx="276" cy="94" r="7" className={styles.accentFill} />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 368 264"
      role="img"
      aria-label="Composição gráfica do projeto"
      className={styles.graphicSvg}
    >
      {common}
      <g className={styles.drawing}>{drawings[artwork]}</g>
    </svg>
  );
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const content = (
    <>
      <div className={styles.media}>
        {item.kind === "media" ? (
          <Image
            src={item.poster}
            alt=""
            fill
            sizes={
              item.size === "wide"
                ? "(max-width: 760px) 100vw, 64vw"
                : "(max-width: 760px) 100vw, 46vw"
            }
          />
        ) : (
          <PortfolioArtworkGraphic artwork={item.artwork} />
        )}
        <span className={styles.mediaGrid} aria-hidden="true" />
        <span className={styles.mediaGlow} aria-hidden="true" />
      </div>

      <div className={styles.cardTopline}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{disciplineLabels[item.discipline]}</span>
      </div>

      <div className={styles.cardCopy}>
        <p>{item.service}</p>
        <h2>{item.title}</h2>
        <div className={styles.context}>
          <span>{item.contextLabel}</span>
          <strong>{item.context}</strong>
        </div>
      </div>

      {item.href ? (
        <span className={styles.visit} aria-hidden="true">
          Ver projeto <Arrow />
        </span>
      ) : null}
    </>
  );

  const className = `${styles.card} ${styles[item.size]} ${styles[item.discipline]}`;

  return item.href ? (
    <a
      className={className}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title}. ${item.service}. Abrir projeto em nova aba.`}
    >
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  );
}

export function PortfolioGallery({ items }: { items: readonly PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");
  const visibleItems =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.discipline === activeFilter);

  return (
    <section className={styles.section} aria-labelledby="portfolio-gallery-title">
      <div className={`shell ${styles.intro}`}>
        <div>
          <p className={styles.eyebrow}>Seleção de trabalhos</p>
          <h2 id="portfolio-gallery-title">Um repertório. Duas frentes.</h2>
        </div>
        <div className={styles.filters} aria-label="Filtrar portfólio">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              <span>{filter.label}</span>
              <small>
                {filter.value === "all"
                  ? items.length
                  : items.filter((item) => item.discipline === filter.value).length}
              </small>
            </button>
          ))}
        </div>
      </div>

      <div className={`shell ${styles.grid}`} aria-live="polite">
        {visibleItems.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={items.findIndex((entry) => entry.id === item.id)}
          />
        ))}
      </div>
    </section>
  );
}
