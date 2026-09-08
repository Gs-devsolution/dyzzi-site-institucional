"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/arrow";
import type { CaseCatalogItem, CaseMedia } from "@/content/cases";
import styles from "@/components/cases-stage.module.css";

type CasesStageProps = {
  readonly items: readonly CaseCatalogItem[];
};

function CuratorialArtwork({ variant }: { variant: "brand" | "technology" }) {
  return (
    <div className={`${styles.artwork} ${styles[`artwork-${variant}`]}`}>
      <span className={styles.artworkOrb} />
      <span className={styles.artworkAxis} />
      <span className={styles.artworkFrame} />
      <span className={styles.artworkMark}>
        {variant === "brand" ? "B" : "T"}
      </span>
      <span className={styles.artworkLabel}>DYZZI / CURADORIA</span>
    </div>
  );
}

function PublishedMedia({
  media,
  priority = false,
  caseIndex,
}: {
  media: CaseMedia;
  priority?: boolean;
  caseIndex?: number;
}) {
  if (media.kind === "video") {
    return (
      <video
        aria-label={media.alt}
        autoPlay
        loop
        muted
        playsInline
        poster={media.poster}
        preload="metadata"
        data-case-index={caseIndex}
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      sizes="(max-width: 860px) 84vw, 56vw"
    />
  );
}

function MobilePreview({
  item,
  priority = false,
}: {
  item: CaseCatalogItem;
  priority?: boolean;
}) {
  if (item.status === "curating") {
    return <CuratorialArtwork variant={item.artwork} />;
  }

  const media =
    item.hero.kind === "video"
      ? {
          kind: "image" as const,
          src: item.hero.poster,
          alt: item.hero.alt,
        }
      : item.hero;

  return <PublishedMedia media={media} priority={priority} />;
}

function CaseIndexContent({ item }: { item: CaseCatalogItem }) {
  return (
    <>
      <span className={styles.indexNumber} aria-hidden="true">
        {String(item.order).padStart(2, "0")}
      </span>
      <span className={styles.indexCopy}>
        <span className={styles.indexSegment}>{item.segment}</span>
        <strong>{item.title}</strong>
        <span className={styles.indexServices}>{item.services.join(" · ")}</span>
      </span>
      <span className={styles.indexAction}>
        {item.status === "published" ? "Explorar case" : "Em curadoria"}
        <Arrow />
      </span>
    </>
  );
}

export function CasesStage({ items }: CasesStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const videos = stageRef.current?.querySelectorAll("video") ?? [];

    videos.forEach((video) => {
      video.muted = true;
      video.volume = 0;

      if (
        Number(video.dataset.caseIndex) === activeIndex &&
        isVisible &&
        pageVisible
      ) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isVisible, pageVisible]);

  const activate = (index: number) => setActiveIndex(index);

  return (
    <section ref={rootRef} className={styles.showcase} aria-label="Vitrine de cases">
      <div className={`shell ${styles.desktopLayout}`}>
        <div className={styles.index} aria-label="Índice de cases">
          {items.map((item, index) => {
            const className = `${styles.indexItem} ${
              index === activeIndex ? styles.indexItemActive : ""
            }`;
            const interaction = {
              onFocus: () => activate(index),
              onMouseEnter: () => activate(index),
            };

            return item.status === "published" ? (
              <Link
                className={className}
                href={`/cases/${item.slug}`}
                key={item.title}
                aria-current={index === activeIndex ? "true" : undefined}
                {...interaction}
              >
                <CaseIndexContent item={item} />
              </Link>
            ) : (
              <button
                className={className}
                type="button"
                key={item.title}
                aria-pressed={index === activeIndex}
                {...interaction}
                onClick={() => activate(index)}
              >
                <CaseIndexContent item={item} />
              </button>
            );
          })}
        </div>

        <div className={styles.stageSticky} ref={stageRef}>
          <div className={styles.stage} aria-live="polite">
            {items.map((item, index) => (
              <article
                className={`${styles.stagePanel} ${
                  index === activeIndex ? styles.stagePanelActive : ""
                }`}
                aria-hidden={index !== activeIndex}
                key={item.title}
              >
                <div className={styles.stageMedia}>
                  {item.status === "published" ? (
                    <PublishedMedia
                      media={item.hero}
                      priority={index === 0}
                      caseIndex={index}
                    />
                  ) : (
                    <CuratorialArtwork variant={item.artwork} />
                  )}
                </div>
                <div className={styles.stageShade} aria-hidden="true" />
                <div className={styles.stageTopline}>
                  <span>{String(item.order).padStart(2, "0")} / 03</span>
                  <span>
                    {item.status === "published"
                      ? "Case DYZZI"
                      : item.curatorialLabel}
                  </span>
                </div>
                <div className={styles.stageCaption}>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mobileViewport} aria-label="Cases por toque">
        <div className={styles.mobileTrack}>
          {items.map((item, index) => {
            const content = (
              <>
                <div className={styles.mobileMedia}>
                  <MobilePreview item={item} priority={index === 0} />
                  <span className={styles.mobileStatus}>
                    {item.status === "published"
                      ? "Case DYZZI"
                      : item.curatorialLabel}
                  </span>
                </div>
                <div className={styles.mobileCopy}>
                  <span>
                    {String(item.order).padStart(2, "0")} · {item.segment}
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.services.join(" · ")}</p>
                  <span className={styles.mobileAction}>
                    {item.status === "published" ? "Explorar case" : "Em curadoria"}
                    <Arrow />
                  </span>
                </div>
              </>
            );

            return item.status === "published" ? (
              <Link
                className={styles.mobileCard}
                href={`/cases/${item.slug}`}
                key={item.title}
              >
                {content}
              </Link>
            ) : (
              <article className={styles.mobileCard} key={item.title}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
