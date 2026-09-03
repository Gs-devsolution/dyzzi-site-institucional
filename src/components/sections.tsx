import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { ClientsCarousel } from "@/components/clients-carousel";
import { HeroWord } from "@/components/hero-word";
import { InteractiveHeroMark } from "@/components/interactive-hero-mark";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { ServicesShowcase } from "@/components/services-showcase";
import { TestimonialsShowcase } from "@/components/testimonials-showcase";
import { links, siteContent } from "@/content/site-content";

function BudgetLink({ className = "" }: { className?: string }) {
  return (
    <a
      className={`button ${className}`.trim()}
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cta-label">Solicitar Orçamento</span>
      <span className="cta-arrow">
        <Arrow />
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function LightSectionMarks({
  variant,
}: {
  variant: "about" | "projects" | "clients";
}) {
  return (
    <div
      className={`light-section-marks light-section-marks-${variant}`}
      aria-hidden="true"
    >
      <span className="light-section-mark light-section-mark-one" />
      <span className="light-section-mark light-section-mark-two" />
      <span className="light-section-mark light-section-mark-three" />
      <span className="light-section-mark light-section-mark-four" />
      <span className="light-section-mark light-section-mark-five" />
    </div>
  );
}

export function Hero() {
  const { hero } = siteContent;
  const titleLead = hero.title.replace(" & criativo", "");

  return (
    <section className="hero" id="home">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 aria-label={hero.title}>
            <span className="hero-title-lead">{titleLead}</span>
            <span className="hero-ending" aria-hidden="true">
              <span>&amp;</span>
              <HeroWord />
            </span>
          </h1>
          <BudgetLink className="button-light" />
        </div>
        <InteractiveHeroMark />
      </div>
    </section>
  );
}

export function About() {
  const { about } = siteContent;

  return (
    <section className="section about" id="sobre">
      <div className="shell about-grid">
        <div className="about-heading">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2>{about.title}</h2>
        </div>
        <div className="about-copy">
          <p>{about.body}</p>
          <BudgetLink />
        </div>
      </div>
      <LightSectionMarks variant="about" />
    </section>
  );
}

export function Services() {
  const { services } = siteContent;

  return (
    <section className="section services" id="servicos">
      <div className="shell services-layout">
        <div className="services-sidebar">
          <div className="section-heading section-heading-light">
            <Eyebrow>{services.eyebrow}</Eyebrow>
            <h2>{services.title}</h2>
          </div>
          <BudgetLink className="button-light services-cta" />
        </div>
        <ServicesShowcase items={services.items} />
      </div>
    </section>
  );
}

export function Projects() {
  const { projects } = siteContent;

  return (
    <section className="section projects">
      <div className="shell projects-heading">
        <div>
          <Eyebrow>{projects.eyebrow}</Eyebrow>
          <h2 className="preserve-lines">{projects.title}</h2>
        </div>
        <div className="projects-actions">
          <a
            className="text-link"
            href={links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cta-label">{projects.portfolioCta}</span>
            <span className="cta-arrow">
              <Arrow />
            </span>
          </a>
          <BudgetLink />
        </div>
      </div>
      <ProjectsShowcase items={projects.items} />
      <LightSectionMarks variant="projects" />
    </section>
  );
}

export function Clients() {
  const { clients } = siteContent;

  return (
    <section className="section clients">
      <div className="shell">
        <div className="clients-heading">
          <Eyebrow>{clients.eyebrow}</Eyebrow>
          <h2>{clients.title}</h2>
        </div>
        <ClientsCarousel items={clients.items} />
        <BudgetLink className="clients-cta" />
      </div>
      <LightSectionMarks variant="clients" />
    </section>
  );
}

export function Testimonials() {
  const { testimonials } = siteContent;

  return (
    <section className="section testimonials">
      <div className="shell testimonials-layout">
        <div className="testimonials-heading">
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <h2 className="preserve-lines">{testimonials.title}</h2>
        </div>
        <TestimonialsShowcase
          items={testimonials.items}
          cta={<BudgetLink className="button-light testimonials-cta" />}
        />
      </div>
    </section>
  );
}

export function ContactCta() {
  const { contactCta } = siteContent;

  return (
    <section className="section contact-cta">
      <div className="contact-rings" aria-hidden="true">
        <span className="contact-ring" />
        <span className="contact-ring" />
        <span className="contact-ring" />
        <span className="contact-ring" />
        <span className="contact-ring" />
      </div>
      <div className="shell contact-cta-inner">
        <h2 className="preserve-lines">{contactCta.title}</h2>
        <p className="preserve-lines">{contactCta.body}</p>
        <BudgetLink className="button-light" />
      </div>
    </section>
  );
}

export function CareersAndSocial() {
  const { careers, social } = siteContent;

  return (
    <section className="section careers-social" id="contatos">
      <div className="shell careers-social-grid">
        <article className="careers-panel">
          <h2>{careers.title}</h2>
          <p>{careers.body}</p>
          <a
            className="button button-light"
            href={links.careers}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cta-label">{careers.cta}</span>
            <span className="cta-arrow">
              <Arrow />
            </span>
          </a>
        </article>
        <div className="social-panel">
          <h2>{social.title}</h2>
          <dl className="contact-list">
            {social.items.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer } = siteContent;

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/dyzzi-white.png"
            alt="Agência DYZZI"
            width={500}
            height={500}
            sizes="190px"
          />
          <p>{footer.identification}</p>
          <p className="footer-slogan">{footer.slogan}</p>
          <BudgetLink className="button-light" />
        </div>
        <FooterLinks
          title={footer.navigationTitle}
          links={footer.navigation}
        />
        <FooterLinks title={footer.socialTitle} links={footer.social} />
        <FooterLinks title={footer.contactTitle} links={footer.contact} />
      </div>
      <div className="shell footer-bottom">
        <p>{footer.copyright}</p>
        <p>{footer.portoDigital}</p>
      </div>
    </footer>
  );
}

type FooterLink = {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
};

function FooterLinks({
  title,
  links: items,
}: {
  title: string;
  links: readonly FooterLink[];
}) {
  return (
    <nav className="footer-links" aria-label={title}>
      <h3>{title}</h3>
      {items.map((item) => {
        const isExternal = item.external || item.href.startsWith("http");

        return (
          <a
            href={item.href}
            key={item.label}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
