"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type TestimonialItem = {
  readonly quote: string;
  readonly author: string;
};

type TestimonialsShowcaseProps = {
  readonly items: readonly TestimonialItem[];
  readonly cta: ReactNode;
};

export function TestimonialsShowcase({
  items,
  cta,
}: TestimonialsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wallRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!activeEntry) {
          return;
        }

        const index = Number(
          (activeEntry.target as HTMLElement).dataset.testimonialIndex,
        );

        if (Number.isInteger(index)) {
          setActiveIndex(index);
        }
      },
      {
        rootMargin: "-30% 0px -54% 0px",
        threshold: [0, 0.15, 0.35],
      },
    );

    const nodes = itemRefs.current;
    nodes.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const wall = wallRef.current;
    const activeItem = itemRefs.current[activeIndex];

    if (!wall || !activeItem) {
      return;
    }

    const updateProgress = () => {
      const markerCenter = Math.min(52, activeItem.offsetHeight * 0.22);
      wall.style.setProperty(
        "--testimonials-progress",
        `${activeItem.offsetTop + markerCenter}px`,
      );
    };

    updateProgress();

    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(wall);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex]);

  const handlePointerEnter = (
    event: PointerEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.pointerType !== "touch") {
      setActiveIndex(index);
    }
  };

  return (
    <div className="testimonials-wall" ref={wallRef}>
      <div className="testimonials-rail" aria-hidden="true">
        <span className="testimonials-rail-progress" />
      </div>

      <div className="testimonials-list">
        {items.map((testimonial, index) => {
          const isActive = activeIndex === index;
          const number = String(index + 1).padStart(2, "0");

          return (
            <figure
              className={`testimonial${isActive ? " is-active" : ""}`}
              data-testimonial-index={index}
              key={testimonial.author}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              onPointerEnter={(event) => handlePointerEnter(event, index)}
            >
              <span className="testimonial-marker" aria-hidden="true">
                <span />
              </span>

              <div className="testimonial-meta" aria-hidden="true">
                <span className="testimonial-number">{number}</span>
                <span className="testimonial-total">
                  / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote>
                <span className="testimonial-quote-mark" aria-hidden="true">
                  “
                </span>
                <p>{testimonial.quote}</p>
              </blockquote>

              <figcaption>
                <span aria-hidden="true" />
                {testimonial.author}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="testimonials-cta-node">
        <span className="testimonial-marker testimonial-marker-cta" aria-hidden="true">
          <span />
        </span>
        {cta}
      </div>
    </div>
  );
}
