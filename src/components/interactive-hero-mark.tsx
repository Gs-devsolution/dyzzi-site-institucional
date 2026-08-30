"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MotionValues = {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  scrollY: number;
  scrollRotate: number;
  scale: number;
};

const RESTING_MOTION: MotionValues = {
  x: 0,
  y: 0,
  rotateX: 0,
  rotateY: 0,
  scrollY: 0,
  scrollRotate: 0,
  scale: 1,
};

const EASING = 0.075;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function interpolate(current: number, target: number) {
  return current + (target - current) * EASING;
}

export function InteractiveHeroMark() {
  const heroArtRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroArt = heroArtRef.current;
    const mark = markRef.current;

    if (!heroArt || !mark) {
      return;
    }

    const heroSection = heroArt.closest(".hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const current = { ...RESTING_MOTION };
    const target = { ...RESTING_MOTION };
    let animationFrame = 0;
    let isVisible = true;

    const resetMark = () => {
      Object.assign(current, RESTING_MOTION);
      Object.assign(target, RESTING_MOTION);
      mark.style.transform = "none";
    };

    const renderMotion = () => {
      current.x = interpolate(current.x, target.x);
      current.y = interpolate(current.y, target.y);
      current.rotateX = interpolate(current.rotateX, target.rotateX);
      current.rotateY = interpolate(current.rotateY, target.rotateY);
      current.scrollY = interpolate(current.scrollY, target.scrollY);
      current.scrollRotate = interpolate(
        current.scrollRotate,
        target.scrollRotate,
      );
      current.scale = interpolate(current.scale, target.scale);

      mark.style.transform = `perspective(900px) translate3d(${current.x.toFixed(2)}px, ${(current.y + current.scrollY).toFixed(2)}px, 0) rotateX(${current.rotateX.toFixed(2)}deg) rotateY(${current.rotateY.toFixed(2)}deg) rotateZ(${current.scrollRotate.toFixed(2)}deg) scale(${current.scale.toFixed(4)})`;

      const unsettled =
        Math.abs(target.x - current.x) > 0.01 ||
        Math.abs(target.y - current.y) > 0.01 ||
        Math.abs(target.rotateX - current.rotateX) > 0.01 ||
        Math.abs(target.rotateY - current.rotateY) > 0.01 ||
        Math.abs(target.scrollY - current.scrollY) > 0.01 ||
        Math.abs(target.scrollRotate - current.scrollRotate) > 0.01 ||
        Math.abs(target.scale - current.scale) > 0.0001;

      if (unsettled && isVisible && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(renderMotion);
      } else {
        animationFrame = 0;
      }
    };

    const queueMotion = () => {
      if (
        animationFrame === 0 &&
        isVisible &&
        !reducedMotion.matches
      ) {
        animationFrame = window.requestAnimationFrame(renderMotion);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || !isVisible) {
        return;
      }

      const normalizedX = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      const normalizedY = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);

      target.x = normalizedX * 22;
      target.y = normalizedY * 14;
      target.rotateX = normalizedY * -6;
      target.rotateY = normalizedX * 8;
      queueMotion();
    };

    const resetPointer = () => {
      target.x = 0;
      target.y = 0;
      target.rotateX = 0;
      target.rotateY = 0;
      queueMotion();
    };

    const handleScroll = () => {
      if (reducedMotion.matches) {
        return;
      }

      const heroRect = heroSection?.getBoundingClientRect();

      if (!heroRect) {
        return;
      }

      const progress = clamp(-heroRect.top / heroRect.height, 0, 1);
      target.scrollY = progress * 72;
      target.scrollRotate = progress * 4.5;
      target.scale = 1 - progress * 0.035;
      queueMotion();
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        resetMark();
      } else {
        handleScroll();
        queueMotion();
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          handleScroll();
          queueMotion();
        }
      },
      { threshold: 0.05 },
    );

    visibilityObserver.observe(heroArt);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.documentElement.addEventListener("pointerleave", resetPointer);
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleScroll();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", resetPointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div className="hero-art" ref={heroArtRef} aria-hidden="true">
      <span className="hero-disc" />
      <div className="hero-mark-interactive" ref={markRef}>
        <div className="hero-mark-float">
          <Image
            src="/media/simbolo-3d.png"
            alt=""
            width={365}
            height={660}
            priority
            sizes="(max-width: 760px) 55vw, 19vw"
          />
        </div>
      </div>
    </div>
  );
}
