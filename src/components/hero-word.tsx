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
    const timer = window.setInterval(() => {
      setWordIndex((currentIndex) =>
        (currentIndex + 1) % HERO_WORDS.length,
      );
    }, WORD_DURATION_MS);

    return () => {
      window.clearInterval(timer);
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
