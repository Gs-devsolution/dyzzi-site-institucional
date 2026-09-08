"use client";

import { useEffect, useRef, useState } from "react";

type ViewportVideoProps = {
  readonly src: string;
  readonly poster: string;
  readonly label: string;
  readonly className?: string;
};

function PlaybackIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
    </svg>
  );
}

export function ViewportVideo({
  src,
  poster,
  label,
  className = "",
}: ViewportVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const userPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;

    if (!root || !video) return;

    video.muted = true;
    video.volume = 0;

    const syncPlayback = () => {
      const shouldPlay =
        visibleRef.current &&
        !document.hidden &&
        !userPausedRef.current;

      if (shouldPlay) {
        void video.play().catch(() => undefined);
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.28 },
    );

    const onVisibilityChange = () => syncPlayback();

    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    userPausedRef.current = !video.paused;
    video.muted = true;
    video.volume = 0;

    if (video.paused) {
      userPausedRef.current = false;
      void video.play().catch(() => undefined);
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <div ref={rootRef} className={className}>
      <video
        ref={videoRef}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className="case-video-control"
        aria-label={isPaused ? "Reproduzir vídeo" : "Pausar vídeo"}
        onClick={togglePlayback}
      >
        <PlaybackIcon paused={isPaused} />
      </button>
    </div>
  );
}
