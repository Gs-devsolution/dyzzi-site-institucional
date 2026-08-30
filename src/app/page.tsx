import {
  About,
  CareersAndSocial,
  Clients,
  ContactCta,
  Footer,
  Hero,
  Projects,
  Services,
  Testimonials,
} from "@/components/sections";
import { Header } from "@/components/header";
import { links, siteContent } from "@/content/site-content";

export default function Home() {
  return (
    <>
      <Header
        navigation={siteContent.navigation}
        whatsapp={links.whatsapp}
        cta={siteContent.hero.cta}
      />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Clients />
        <Testimonials />
        <ContactCta />
        <CareersAndSocial />
      </main>
      <Footer />
    </>
  );
}
