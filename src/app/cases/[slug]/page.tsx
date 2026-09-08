import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/arrow";
import { Header } from "@/components/header";
import { BudgetLink, Footer } from "@/components/sections";
import { ViewportVideo } from "@/components/viewport-video";
import {
  getPublishedCase,
  publishedCases,
  type CaseGalleryBlock,
  type CaseMedia,
} from "@/content/cases";
import { links, siteContent } from "@/content/site-content";
import styles from "@/app/cases/cases.module.css";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublishedCase(slug);

  if (!item) {
    return { robots: { index: false, follow: false } };
  }

  return {
    title: `${item.title} | Cases DYZZI`,
    description: item.summary,
    alternates: { canonical: `/cases/${item.slug}` },
    robots: { index: false, follow: false },
  };
}

function Media({
  media,
  priority = false,
}: {
  media: CaseMedia;
  priority?: boolean;
}) {
  if (media.kind === "video") {
    return (
      <ViewportVideo
        src={media.src}
        poster={media.poster}
        label={media.alt}
        className={styles.caseVideo}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      sizes="100vw"
    />
  );
}

function GalleryBlock({ block }: { block: CaseGalleryBlock }) {
  if (block.kind === "split") {
    return (
      <figure className={styles.galleryBlock}>
        <div className={styles.gallerySplit}>
          {block.media.map((media) => (
            <div className={styles.galleryMedia} key={`${media.kind}-${media.src}`}>
              <Media media={media} />
            </div>
          ))}
        </div>
        {block.caption ? (
          <figcaption className={styles.galleryCaption}>{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  const formatClass =
    block.kind === "portrait"
      ? styles.galleryPortrait
      : block.kind === "device"
        ? styles.galleryDevice
        : block.kind === "video"
          ? styles.galleryVideo
          : "";

  return (
    <figure className={styles.galleryBlock}>
      <div className={`${styles.galleryMedia} ${formatClass}`.trim()}>
        <Media media={block.media} />
      </div>
      {block.caption ? (
        <figcaption className={styles.galleryCaption}>{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getPublishedCase(slug);

  if (!item) notFound();

  const currentIndex = publishedCases.findIndex((entry) => entry.slug === item.slug);
  const previous = currentIndex > 0 ? publishedCases[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < publishedCases.length - 1
      ? publishedCases[currentIndex + 1]
      : undefined;

  return (
    <>
      <Header
        navigation={siteContent.navigation}
        whatsapp={links.whatsapp}
        cta={siteContent.hero.cta}
      />
      <main>
        <section className={styles.detailHero} aria-labelledby="case-title">
          <div className={styles.detailHeroMedia}>
            <Media media={item.hero} priority />
          </div>
          <div className={styles.detailHeroShade} aria-hidden="true" />
          <Link className={styles.detailBack} href="/cases">
            <Arrow /> Voltar aos cases
          </Link>
          <div className={`shell ${styles.detailHeroInner}`}>
            <div>
              <p className={styles.detailKicker}>Case DYZZI · {item.period}</p>
              <h1 id="case-title">{item.title}</h1>
            </div>
            <div className={styles.detailMeta}>
              <div>
                <span className={styles.detailMetaLabel}>Segmento</span>
                <p>{item.segment}</p>
              </div>
              <div>
                <span className={styles.detailMetaLabel}>Serviços</span>
                <p>{item.services.join(" · ")}</p>
              </div>
              <div>
                <span className={styles.detailMetaLabel}>Período</span>
                <p>{item.period}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailStory} aria-label="Contexto e atuação">
          <div className={`shell ${styles.detailStoryGrid}`}>
            <p className={styles.detailSectionLabel}>Visão do projeto</p>
            <div className={styles.detailNarrative}>
              <article>
                <h2>Contexto</h2>
                <p>{item.context}</p>
              </article>
              <article>
                <h2>Atuação da DYZZI</h2>
                <p>{item.role}</p>
              </article>
            </div>
          </div>
        </section>

        {item.results?.length ? (
          <section className={styles.results} aria-labelledby="case-results-title">
            <div className="shell">
              <p className={styles.detailSectionLabel}>Resultados</p>
              <h2 id="case-results-title">Impacto do projeto</h2>
              <ul className={styles.resultsList}>
                {item.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className={styles.gallery} aria-labelledby="case-gallery-title">
          <div className="shell">
            <div className={styles.galleryHeading}>
              <h2 id="case-gallery-title">O case em movimento</h2>
              <p>Uma seleção visual da entrega realizada pela DYZZI.</p>
            </div>
            <div className={styles.galleryGrid}>
              {item.gallery.map((block, index) => (
                <GalleryBlock block={block} key={`${block.kind}-${index}`} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="case-contact-title">
          <div className={`shell ${styles.closingInner}`}>
            <div>
              <h2 id="case-contact-title">Sua marca pode ser o próximo case.</h2>
              <p>Converse com a DYZZI e transforme a próxima ideia em uma entrega real.</p>
            </div>
            <BudgetLink className="button-light" />
          </div>
        </section>

        <nav className={styles.detailNavigation} aria-label="Navegação entre cases">
          <Link href={previous ? `/cases/${previous.slug}` : "/cases"}>
            <span>{previous ? "Case anterior" : "Índice"}</span>
            <strong>{previous?.title ?? "Todos os cases"}</strong>
          </Link>
          <Link href={next ? `/cases/${next.slug}` : "/cases"}>
            <span>{next ? "Próximo case" : "Índice"}</span>
            <strong>{next?.title ?? "Todos os cases"}</strong>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
