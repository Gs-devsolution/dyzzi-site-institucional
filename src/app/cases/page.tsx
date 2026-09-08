import type { Metadata } from "next";
import Image from "next/image";
import { CasesStage } from "@/components/cases-stage";
import { Header } from "@/components/header";
import { BudgetLink, Footer } from "@/components/sections";
import { casesCatalog } from "@/content/cases";
import { links, siteContent } from "@/content/site-content";
import styles from "@/app/cases/cases.module.css";

export const metadata: Metadata = {
  title: "Cases | Agência DYZZI",
  description:
    "Estrutura em validação para os cases realizados diretamente pela Agência DYZZI.",
  alternates: { canonical: "/cases" },
  robots: { index: false, follow: false },
};

export default function CasesPage() {
  return (
    <>
      <Header
        navigation={siteContent.navigation}
        whatsapp={links.whatsapp}
        cta={siteContent.hero.cta}
      />
      <main>
        <section className={styles.hero} aria-labelledby="cases-title">
          <span className={styles.heroOrbit} aria-hidden="true" />
          <div className={`shell ${styles.heroInner}`}>
            <div>
              <p className={styles.heroEyebrow}>Portfólio DYZZI</p>
              <h1 id="cases-title">Cases</h1>
            </div>
            <div className={styles.heroMeta}>
              <Image
                src="/brand/dyzzi-white.png"
                alt=""
                width={500}
                height={500}
                sizes="138px"
                aria-hidden="true"
              />
              <p className={styles.heroStatus}>
                Estrutura em validação · conteúdo em curadoria
              </p>
            </div>
          </div>
        </section>

        <CasesStage items={casesCatalog} />

        <section className={styles.closing} aria-labelledby="cases-contact-title">
          <div className={`shell ${styles.closingInner}`}>
            <div>
              <h2 id="cases-contact-title">Vamos construir o próximo case?</h2>
              <p>
                Estratégia, comunicação e tecnologia conectadas a uma entrega com propósito.
              </p>
            </div>
            <BudgetLink className="button-light" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
