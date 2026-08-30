"use client";

import { useEffect, useRef } from "react";

type ProjectVideoProps = {
  mp4: string;
  poster: string;
  label: string;
};

export function ProjectVideo({ mp4, poster, label }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    let isNearViewport = false;

    const syncPlayback = () => {
      if (!video) return;

      if (reducedMotion.matches || !isNearViewport) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "240px 0px" },
    );

    if (video) observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label={label}
      controls
      loop
      muted
      playsInline
      poster={poster}
      preload="none"
    >
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
