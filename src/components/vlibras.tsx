"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

export function VLibras() {
  const [isEnabled, setIsEnabled] = useState(false);
  const vw = { vw: "true" };
  const accessButton = { "vw-access-button": "true" };
  const pluginWrapper = { "vw-plugin-wrapper": "true" };

  return (
    <>
      {!isEnabled ? (
        <button
          className="vlibras-launcher"
          type="button"
          aria-label="Conteúdo acessível em Libras"
          onClick={() => setIsEnabled(true)}
        >
          <Image
            src="/media/vlibras-access.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>
      ) : (
        <>
          <div {...vw} className="enabled">
            <div {...accessButton} className="active" />
            <div {...pluginWrapper}>
              <div className="vw-plugin-top-wrapper" />
            </div>
          </div>
          <Script
            id="vlibras-widget"
            src="https://vlibras.gov.br/app/vlibras-plugin.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (!window.VLibras) return;

              new window.VLibras.Widget("https://vlibras.gov.br/app");

              let attempts = 0;
              const patchWidgetAccessibility = () => {
                const visit = (root: Document | Element | ShadowRoot) => {
                  root.querySelectorAll("img:not([alt])").forEach((image) => {
                    image.setAttribute("alt", "");
                  });

                  const popup = root.querySelector<HTMLImageElement>(
                    "img#vlibras-popup",
                  );
                  if (popup) {
                    popup.setAttribute("aria-hidden", "true");
                    popup.style.setProperty("display", "none", "important");
                  }

                  root.querySelectorAll("*").forEach((element) => {
                    if (element.shadowRoot) visit(element.shadowRoot);
                  });
                };

                visit(document);
                attempts += 1;
                if (attempts < 20) {
                  window.setTimeout(patchWidgetAccessibility, 250);
                }
              };

              patchWidgetAccessibility();
            }}
          />
        </>
      )}
    </>
  );
}
