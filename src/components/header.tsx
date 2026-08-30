"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/arrow";

type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
};

type HeaderProps = {
  navigation: readonly NavigationItem[];
  whatsapp: string;
  cta: string;
};

export function Header({ navigation, whatsapp, cta }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.toggle("menu-is-open", isOpen);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="header-logo" href="#home" onClick={closeMenu}>
          <Image
            src="/brand/dyzzi-white.png"
            alt="Agência DYZZI"
            width={500}
            height={500}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.label}
              target={"external" in item ? "_blank" : undefined}
              rel={"external" in item ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="button button-small header-cta"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta}
          <Arrow />
        </a>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navegação mobile"
        aria-hidden={!isOpen}
      >
        <div className="shell mobile-nav-inner">
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.label}
              tabIndex={isOpen ? 0 : -1}
              target={"external" in item ? "_blank" : undefined}
              rel={"external" in item ? "noopener noreferrer" : undefined}
              onClick={closeMenu}
            >
              {item.label}
              <Arrow />
            </a>
          ))}
          <a
            className="button"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isOpen ? 0 : -1}
            onClick={closeMenu}
          >
            {cta}
            <Arrow />
          </a>
        </div>
      </nav>
    </header>
  );
}
