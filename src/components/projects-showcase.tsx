"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import styles from "@/components/projects-showcase.module.css";

type ProjectShowcaseItem = {
  readonly id: string;
  readonly service: string;
  readonly project: string;
  readonly mp4: string;
  readonly poster: string;
};

type ProjectsShowcaseProps = {
  items: readonly ProjectShowcaseItem[];
};

const TRANSITION_DURATION = 560;
const DRAG_ACTIVATION_DISTANCE = 8;
const DRAG_VELOCITY_THRESHOLD = 0.45;
const MAX_DRAG_OFFSET = 160;

type MovementDirection = -1 | 1;

type TransitionState = {
  readonly from: number;
  readonly to: number;
  readonly direction: MovementDirection;
  readonly wrap: number;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paused ? (
        <path d="M8 5v14l11-7z" fill="currentColor" />
      ) : (
        <>
          <path d="M7 5h3v14H7z" fill="currentColor" />
          <path d="M14 5h3v14h-3z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 10v4h3l4 3V7l-4 3H5z"
        fill="currentColor"
      />
      {muted ? (
        <path
          d="M16 9l4 6m0-6l-4 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      ) : (
        <path
          d="M15.5 9.2c1.8 1.5 1.8 4.1 0 5.6M18 7c3.3 2.8 3.3 7.2 0 10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
      )}
    </svg>
  );
}

function getPosition(index: number, activeIndex: number, length: number) {
  if (index === activeIndex) return "active";
  if ((index - activeIndex + length) % length === 1) return "next";
  return "previous";
}

export function ProjectsShowcase({ items }: ProjectsShowcaseProps) {
  const initialIndex = Math.max(
    0,
    items.findIndex((item) => item.id === "kabum-sana-2025"),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [audibleIndex, setAudibleIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionState, setTransitionState] =
    useState<TransitionState | null>(null);
  const [teleportIndex, setTeleportIndex] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const transitionTimerRef = useRef<number | null>(null);
  const transitionFrameRef = useRef<number | null>(null);
  const transitionLockedRef = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    active: false,
    captured: false,
    axis: null as "horizontal" | "vertical" | null,
  });
  const suppressClickUntilRef = useRef(0);

  const muteAll = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video) video.muted = true;
    });
  }, []);

  const updateAudio = useCallback(
    (index: number, enableSound: boolean) => {
      if (!items.length) return;

      const nextIndex = (index + items.length) % items.length;
      muteAll();

      if (!enableSound) {
        setAudibleIndex(null);
        return;
      }

      const nextVideo = videoRefs.current[nextIndex];
      if (!nextVideo) {
        setAudibleIndex(null);
        return;
      }

      nextVideo.muted = false;
      setAudibleIndex(nextIndex);

      if (!isPaused && isInViewport && isDocumentVisible) {
        void nextVideo.play().catch(() => {
          nextVideo.muted = true;
          setAudibleIndex((current) =>
            current === nextIndex ? null : current,
          );
        });
      }
    },
    [isDocumentVisible, isInViewport, isPaused, items.length, muteAll],
  );

  const selectProject = useCallback(
    (index: number, enableSound: boolean) => {
      if (!items.length || transitionLockedRef.current) return;

      const nextIndex = (index + items.length) % items.length;
      if (nextIndex === activeIndex) {
        updateAudio(nextIndex, enableSound);
        return;
      }

      const direction: MovementDirection =
        (nextIndex - activeIndex + items.length) % items.length === 1 ? 1 : -1;
      const wrapIndex = items.findIndex(
        (_, itemIndex) => itemIndex !== activeIndex && itemIndex !== nextIndex,
      );

      transitionLockedRef.current = true;
      setTransitionState({
        from: activeIndex,
        to: nextIndex,
        direction,
        wrap: Math.max(0, wrapIndex),
      });
      setActiveIndex(nextIndex);
      updateAudio(nextIndex, enableSound);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        transitionTimerRef.current = null;
        setTeleportIndex(Math.max(0, wrapIndex));
        setTransitionState(null);

        transitionFrameRef.current = window.requestAnimationFrame(() => {
          transitionFrameRef.current = window.requestAnimationFrame(() => {
            setTeleportIndex(null);
            transitionLockedRef.current = false;
            transitionFrameRef.current = null;
          });
        });
      }, TRANSITION_DURATION);
    },
    [activeIndex, items, updateAudio],
  );

  const toggleSound = useCallback(
    (index: number) => {
      if (audibleIndex === index) {
        muteAll();
        setAudibleIndex(null);
        return;
      }

      updateAudio(index, true);
    },
    [audibleIndex, muteAll, updateAudio],
  );

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInViewport(visible);

        if (!visible) {
          muteAll();
          setAudibleIndex(null);
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(showcase);
    return () => observer.disconnect();
  }, [muteAll]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === "visible";
      setIsDocumentVisible(visible);

      if (!visible) {
        muteAll();
        setAudibleIndex(null);
      }
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [muteAll]);

  useEffect(() => {
    const shouldPlay = isInViewport && isDocumentVisible && !isPaused;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = audibleIndex !== index;
      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [audibleIndex, isDocumentVisible, isInViewport, isPaused]);

  const moveBy = useCallback(
    (direction: -1 | 1) => {
      selectProject(activeIndex + direction, false);
    },
    [activeIndex, selectProject],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      transitionLockedRef.current ||
      (event.pointerType === "mouse" && event.button !== 0) ||
      (event.target as HTMLElement).closest(`.${styles.soundButton}`)
    ) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      active: true,
      captured: false,
      axis: null,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const offset = event.clientX - drag.startX;
    const verticalOffset = event.clientY - drag.startY;

    if (drag.axis === null) {
      if (
        Math.max(Math.abs(offset), Math.abs(verticalOffset)) <
        DRAG_ACTIVATION_DISTANCE
      ) {
        return;
      }

      if (Math.abs(verticalOffset) >= Math.abs(offset)) {
        drag.axis = "vertical";
        drag.active = false;
        return;
      }

      drag.axis = "horizontal";
      setIsDragging(true);
    }

    if (drag.axis !== "horizontal") return;
    event.preventDefault();

    if (!drag.captured) {
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.captured = true;
    }

    const elapsed = Math.max(1, event.timeStamp - drag.lastTime);
    drag.velocity = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = event.timeStamp;

    const constrainedOffset = Math.max(
      -MAX_DRAG_OFFSET,
      Math.min(MAX_DRAG_OFFSET, offset),
    );
    event.currentTarget.style.setProperty(
      "--drag-offset",
      `${constrainedOffset}px`,
    );
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const offset = event.clientX - drag.startX;
    const wasHorizontal = drag.axis === "horizontal";
    dragRef.current.active = false;
    setIsDragging(false);
    event.currentTarget.style.setProperty("--drag-offset", "0px");

    if (wasHorizontal && Math.abs(offset) > DRAG_ACTIVATION_DISTANCE) {
      suppressClickUntilRef.current = Date.now() + 350;
    }

    const activeCard = event.currentTarget.querySelector<HTMLElement>(
      `[data-active="true"]`,
    );
    const distanceThreshold = Math.max(
      42,
      (activeCard?.getBoundingClientRect().width ?? 280) * 0.18,
    );
    const shouldAdvance =
      wasHorizontal &&
      (Math.abs(offset) >= distanceThreshold ||
        Math.abs(drag.velocity) >= DRAG_VELOCITY_THRESHOLD);

    if (shouldAdvance) {
      const gestureDirection =
        Math.abs(offset) >= DRAG_ACTIVATION_DISTANCE ? offset : drag.velocity;
      moveBy(gestureDirection < 0 ? 1 : -1);
    }

    if (
      drag.captured &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    drag.pointerId = -1;
    drag.axis = null;
  };

  const handleCardClick = (index: number) => {
    if (Date.now() < suppressClickUntilRef.current) return;

    if (index === activeIndex) {
      toggleSound(index);
    } else {
      selectProject(index, true);
    }
  };

  if (!items.length) return null;

  const activeItem = items[activeIndex];
  const transitionCloneItem = transitionState
    ? items[transitionState.wrap]
    : null;

  return (
    <div
      className={`shell ${styles.shell}`}
      ref={showcaseRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Cases em vídeo da DYZZI"
    >
      <div className={styles.showcase}>
        <div className={styles.ambientGrid} aria-hidden="true" />
        <div className={styles.orbitOne} aria-hidden="true" />
        <div className={styles.orbitTwo} aria-hidden="true" />

        <div
          className={styles.storySegments}
          role="group"
          aria-label="Selecionar um case"
        >
          {items.map((item, index) => (
            <button
              className={styles.storySegment}
              data-active={index === activeIndex}
              type="button"
              key={item.id}
              onClick={() => selectProject(index, false)}
              aria-label={`Ver case ${item.service}: ${item.project}`}
              aria-pressed={index === activeIndex}
            >
              <span />
            </button>
          ))}
        </div>

        <button
          className={styles.pauseButton}
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          aria-label={isPaused ? "Reproduzir todos os vídeos" : "Pausar todos os vídeos"}
          aria-pressed={isPaused}
        >
          <PauseIcon paused={isPaused} />
          <span>{isPaused ? "Reproduzir" : "Pausar"}</span>
        </button>

        <button
          className={`${styles.navigationButton} ${styles.previousButton}`}
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="Mostrar case anterior"
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          className={styles.stage}
          data-dragging={isDragging}
          data-transitioning={transitionState !== null}
          data-direction={
            transitionState?.direction === 1 ? "next" : "previous"
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          role="group"
          aria-label="Use as setas do teclado ou arraste para navegar pelos cases"
        >
          {items.map((item, index) => {
            const position = getPosition(index, activeIndex, items.length);
            const isActive = position === "active";
            const isAudible = audibleIndex === index;
            const transitionRole = transitionState
              ? index === transitionState.from
                ? "outgoing"
                : index === transitionState.to
                  ? "incoming"
                  : "wrap"
              : "idle";

            return (
              <article
                className={styles.card}
                data-position={position}
                data-active={isActive}
                data-transition-role={transitionRole}
                data-teleport={teleportIndex === index}
                key={item.id}
                aria-label={`${item.service}: ${item.project}`}
              >
                <video
                  className={styles.video}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  aria-hidden="true"
                  loop
                  muted
                  playsInline
                  poster={item.poster}
                  preload="metadata"
                >
                  <source src={item.mp4} type="video/mp4" />
                  Seu navegador não oferece suporte à reprodução deste vídeo.
                </video>

                <div className={styles.videoShade} aria-hidden="true" />
                <div className={styles.cardAccent} aria-hidden="true" />

                <div className={styles.caption}>
                  <h3>{item.service}</h3>
                  <p className={styles.project}>{item.project}</p>
                </div>

                <button
                  className={styles.cardAction}
                  type="button"
                  onClick={() => handleCardClick(index)}
                  aria-label={
                    isActive
                      ? isAudible
                        ? `Silenciar vídeo: ${item.project}`
                        : `Ativar som do vídeo: ${item.project}`
                      : `Destacar e ouvir o case: ${item.project}`
                  }
                />

                {isActive ? (
                  <button
                    className={styles.soundButton}
                    type="button"
                    onClick={() => toggleSound(index)}
                    aria-label={
                      isAudible
                        ? `Silenciar vídeo: ${item.project}`
                        : `Ativar som do vídeo: ${item.project}`
                    }
                    aria-pressed={isAudible}
                  >
                    <SoundIcon muted={!isAudible} />
                    <span>{isAudible ? "Som ligado" : "Ativar som"}</span>
                  </button>
                ) : null}
              </article>
            );
          })}

          {transitionState && transitionCloneItem ? (
            <article
              className={`${styles.card} ${styles.transitionClone}`}
              data-direction={
                transitionState.direction === 1 ? "next" : "previous"
              }
              aria-hidden="true"
            >
              <Image
                className={styles.video}
                src={transitionCloneItem.poster}
                alt=""
                fill
                sizes="(max-width: 820px) 76vw, 360px"
                draggable={false}
              />
              <div className={styles.videoShade} aria-hidden="true" />
              <div className={styles.cardAccent} aria-hidden="true" />
              <div className={styles.caption}>
                <h3>{transitionCloneItem.service}</h3>
                <p className={styles.project}>{transitionCloneItem.project}</p>
              </div>
            </article>
          ) : null}
        </div>

        <button
          className={`${styles.navigationButton} ${styles.nextButton}`}
          type="button"
          onClick={() => moveBy(1)}
          aria-label="Mostrar próximo case"
        >
          <ArrowIcon direction="right" />
        </button>

        <p className={styles.liveStatus} aria-live="polite" aria-atomic="true">
          Case {activeIndex + 1} de {items.length}: {activeItem.service}, {activeItem.project}
        </p>
      </div>
    </div>
  );
}
