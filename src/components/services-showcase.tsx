"use client";

import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type ServiceItem = {
  readonly title: string;
  readonly body: string;
};

type ServicesShowcaseProps = {
  items: readonly ServiceItem[];
};

function ServiceGlyph({ index }: { index: number }) {
  const commonProps = {
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  switch (index) {
    case 0:
      return (
        <svg {...commonProps}>
          <path d="M32 8 52 19.5v23L32 54 12 42.5v-23L32 8Z" />
          <circle cx="32" cy="31" r="9" />
          <path d="M32 22V8M23.5 35.5 12 42.5M40.5 35.5 52 42.5" />
          <path className="service-glyph-accent" d="m47 10 1.4 4.1 4.1 1.4-4.1 1.4L47 21l-1.4-4.1-4.1-1.4 4.1-1.4L47 10Z" />
        </svg>
      );
    case 1:
      return (
        <svg {...commonProps}>
          <rect x="9" y="12" width="46" height="36" rx="6" />
          <path d="M21 55h22M27 48v7M37 48v7" />
          <circle cx="32" cy="30" r="7" />
          <path d="M32 19v4M32 37v4M21 30h4M39 30h4M24.2 22.2l2.8 2.8M37 35l2.8 2.8M39.8 22.2 37 25M27 35l-2.8 2.8" />
          <path className="service-glyph-accent" d="M14 20h4M46 20h4" />
        </svg>
      );
    case 2:
      return (
        <svg {...commonProps}>
          <rect x="8" y="14" width="35" height="28" rx="5" />
          <path d="m43 23 12-6v22l-12-6V23Z" />
          <path d="m23 23 10 5-10 5V23Z" />
          <path d="M16 50h24M21 42v8M35 42v8" />
          <circle className="service-glyph-accent" cx="51" cy="12" r="3" />
        </svg>
      );
    case 3:
      return (
        <svg {...commonProps}>
          <path d="m32 8 15 15-15 33-15-33L32 8Z" />
          <circle cx="32" cy="30" r="5" />
          <path d="M32 8v17M17 23h10M37 23h10M24 47h16" />
          <path className="service-glyph-accent" d="M10 14h8M14 10v8M48 48h7M51.5 44.5v7" />
        </svg>
      );
    case 4:
      return (
        <svg {...commonProps}>
          <circle cx="22" cy="24" r="7" />
          <circle cx="43" cy="21" r="5" />
          <path d="M9 48c1.5-9 6-14 13-14s11.5 5 13 14H9ZM36 34c2-4.5 5-7 9-7 6 0 9 4.5 10 11H42" />
          <path className="service-glyph-accent" d="M39 45h16v9l-4-3H39v-6Z" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="29" cy="33" r="21" />
          <circle cx="29" cy="33" r="13" />
          <circle cx="29" cy="33" r="5" />
          <path className="service-glyph-accent" d="m33 29 20-18M43 11h10v10M33 29l9-1" />
          <path d="M44 48h11M49.5 42.5v11" />
        </svg>
      );
  }
}

export function ServicesShowcase({ items }: ServicesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTrigger = (index: number) => {
    triggerRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      focusTrigger(nextIndex);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const showcase = showcaseRef.current;
    if (!showcase) {
      return;
    }

    const bounds = showcase.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    showcase.style.setProperty("--services-pointer-x", `${x}%`);
    showcase.style.setProperty("--services-pointer-y", `${y}%`);
  };

  return (
    <div
      className="services-showcase"
      ref={showcaseRef}
      onPointerMove={handlePointerMove}
    >
      {items.map((service, index) => {
        const isActive = activeIndex === index;
        const panelId = `service-panel-${index}`;
        const triggerId = `service-trigger-${index}`;

        return (
          <article
            className={`service-panel${isActive ? " is-active" : ""}`}
            key={service.title}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") {
                setActiveIndex(index);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") {
                setActiveIndex((current) =>
                  current === index ? null : current,
                );
              }
            }}
          >
            <button
              className="service-panel-trigger"
              id={triggerId}
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              type="button"
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() =>
                setActiveIndex((current) =>
                  current === index ? null : index,
                )
              }
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="service-panel-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="service-panel-title">{service.title}</span>
              <span className="service-panel-toggle" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>

            <div
              className="service-panel-content"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isActive}
            >
              <div className="service-panel-content-inner">
                <p>{service.body}</p>
                <div className="service-glyph-shell">
                  <ServiceGlyph index={index} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
