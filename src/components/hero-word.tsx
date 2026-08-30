"use client";

import { useEffect, useState } from "react";

const HERO_WORDS = [
  { label: "criativo", className: "hero-word-script" },
  { label: "inovador", className: "hero-word-sans" },
  { label: "autêntico", className: "hero-word-serif" },
  { label: "memorável", className: "hero-word-display" },
  { label: "humano", className: "hero-word-human" },
] as const;

const WORD_DURATION_MS = 2800;

export function HeroWord() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const stopRotation = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const startRotation = () => {
      timer = window.setInterval(() => {
        setWordIndex((currentIndex) =>
          (currentIndex + 1) % HERO_WORDS.length,
        );
      }, WORD_DURATION_MS);
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      stopRotation();

      if (event.matches) {
        setWordIndex(0);
      } else {
        startRotation();
      }
    };

    if (!reducedMotion.matches) {
      startRotation();
    }

    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      stopRotation();
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  const word = HERO_WORDS[wordIndex];

  return (
    <span className="hero-word-stage">
      <span className={`hero-word ${word.className}`} key={word.label}>
        {word.label}
      </span>
    </span>
  );
}
