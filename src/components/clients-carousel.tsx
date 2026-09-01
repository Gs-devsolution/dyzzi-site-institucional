"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type ClientCarouselItem = {
  file: string;
  alt: string;
  surface: "light" | "dark";
  scale: number;
  blend?: "multiply";
};

const CAROUSEL_SPEED = 32;
const REDUCED_MOTION_SPEED = 20;
const DRAG_RESUME_DELAY = 1200;

function normalizeOffset(value: number, width: number) {
  if (width <= 0) return 0;
  return ((value % width) + width) % width;
}

function ClientSequence({
  items,
  decorative = false,
  sequenceRef,
}: {
  items: readonly ClientCarouselItem[];
  decorative?: boolean;
  sequenceRef?: React.RefObject<HTMLUListElement | null>;
}) {
  return (
    <ul
      className="clients-carousel-sequence"
      ref={sequenceRef}
      aria-hidden={decorative ? "true" : undefined}
    >
      {items.map((client, index) => (
        <li
          className={`client-card client-card-${client.surface}${client.blend ? ` client-card-blend-${client.blend}` : ""}`}
          style={{ "--client-logo-scale": client.scale } as CSSProperties}
          key={`${client.file}-${decorative ? "duplicate" : "original"}`}
        >
          <span className="client-card-accent" aria-hidden="true" />
          <span className="client-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="client-card-image">
            <Image
              src={`/clients/${client.file}`}
              alt={decorative ? "" : client.alt}
              fill
              sizes="(max-width: 760px) 170px, 230px"
              draggable={false}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ClientsCarousel({
  items,
}: {
  items: readonly ClientCarouselItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSequenceRef = useRef<HTMLUListElement>(null);
  const sequenceWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const lastFrameRef = useRef(0);
  const resumeAtRef = useRef(0);
  const interactionRef = useRef({ hover: false, focus: false, drag: false });
  const carouselVisibleRef = useRef(true);
  const dragRef = useRef({ pointerId: -1, x: 0 });
  const manualPausedRef = useRef(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const sequence = firstSequenceRef.current;
    const carousel = track?.closest(".clients-carousel");
    if (!track || !sequence || !carousel) return;

    const updateWidth = () => {
      const nextWidth = sequence.getBoundingClientRect().width;
      sequenceWidthRef.current = nextWidth;
      offsetRef.current = normalizeOffset(offsetRef.current, nextWidth);
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(sequence);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        carouselVisibleRef.current = entry.isIntersecting;
        lastFrameRef.current = performance.now();
      },
      { rootMargin: "180px 0px" },
    );
    visibilityObserver.observe(carousel);

    let frameId = 0;
    lastFrameRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = Math.min((time - lastFrameRef.current) / 1000, 0.05);
      lastFrameRef.current = time;
      const interaction = interactionRef.current;
      const shouldPause =
        manualPausedRef.current ||
        interaction.hover ||
        interaction.focus ||
        interaction.drag ||
        !carouselVisibleRef.current ||
        document.hidden ||
        time < resumeAtRef.current;

      if (!shouldPause && sequenceWidthRef.current > 0) {
        offsetRef.current = normalizeOffset(
          offsetRef.current +
            (reducedMotion ? REDUCED_MOTION_SPEED : CAROUSEL_SPEED) * elapsed,
          sequenceWidthRef.current,
        );
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [reducedMotion]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX };
    interactionRef.current.drag = true;
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const movement = event.clientX - dragRef.current.x;
    dragRef.current.x = event.clientX;
    offsetRef.current = normalizeOffset(
      offsetRef.current - movement,
      sequenceWidthRef.current,
    );
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.pointerId = -1;
    interactionRef.current.drag = false;
    resumeAtRef.current = performance.now() + DRAG_RESUME_DELAY;
    setDragging(false);
  };

  const setInteraction = (type: "hover" | "focus", active: boolean) => {
    interactionRef.current[type] = active;
    if (!active) resumeAtRef.current = performance.now();
  };

  return (
    <div
      className={`clients-carousel${dragging ? " is-dragging" : ""}${manualPaused ? " is-manually-paused" : ""}`}
      role="region"
      aria-label="Galeria de clientes da DYZZI"
    >
      <span className="clients-carousel-orbit" aria-hidden="true" />
      <span className="clients-carousel-glow" aria-hidden="true" />
      <button
        className="clients-motion-control"
        type="button"
        aria-label={manualPaused ? "Continuar movimento" : "Pausar movimento"}
        aria-pressed={manualPaused}
        onClick={() =>
          setManualPaused((paused) => {
            manualPausedRef.current = !paused;
            return !paused;
          })
        }
      >
        <span className="clients-motion-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <div
        className="clients-carousel-viewport"
        role="group"
        aria-label="Logos dos clientes; use o arraste horizontal para navegar"
        tabIndex={0}
        onMouseEnter={() => setInteraction("hover", true)}
        onMouseLeave={() => setInteraction("hover", false)}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) {
            setInteraction("focus", true);
          }
        }}
        onBlur={() => setInteraction("focus", false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div className="clients-carousel-track" ref={trackRef}>
          <ClientSequence items={items} sequenceRef={firstSequenceRef} />
          <ClientSequence items={items} decorative />
        </div>
      </div>
    </div>
  );
}
