import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { BudgetLink, Footer } from "@/components/sections";
import { portfolioItems } from "@/content/portfolio";
import { links, siteContent } from "@/content/site-content";
import styles from "@/app/portfolio/portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfólio | Agência DYZZI",
  description:
    "Uma seleção de trabalhos de comunicação e tecnologia da Agência DYZZI.",
  alternates: { canonical: "/portfolio" },
  robots: { index: false, follow: false },
};

export default function PortfolioPage() {
  return (
    <>
      <Header
        navigation={siteContent.navigation}
        whatsapp={links.whatsapp}
        cta={siteContent.hero.cta}
      />
      <main>
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <span className={styles.heroOrbit} aria-hidden="true" />
          <div className={`shell ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p>Comunicação + Tecnologia</p>
              <h1 id="portfolio-title">Portfólio</h1>
            </div>
            <div className={styles.heroSignature}>
              <Image
                src="/brand/dyzzi-white.png"
                alt=""
                width={500}
                height={500}
                sizes="150px"
                aria-hidden="true"
              />
              <p>Ideias que comunicam.<br />Tecnologia que transforma.</p>
            </div>
          </div>
        </section>

        <PortfolioGallery items={portfolioItems} />

        <section className={styles.closing} aria-labelledby="portfolio-contact-title">
          <span className={styles.closingOrbit} aria-hidden="true" />
          <div className={`shell ${styles.closingInner}`}>
            <div>
              <p className={styles.closingEyebrow}>Próximo projeto</p>
              <h2 id="portfolio-contact-title">Vamos criar algo memorável?</h2>
            </div>
            <BudgetLink className="button-light" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
