import { links, siteContent } from "@/content/site-content";

const baseUrl = "https://www.agenciadyzzi.com.br";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: "Agência DYZZI",
    alternateName: "DYZZI Comunicação Digital",
    url: baseUrl,
    logo: `${baseUrl}/brand/dyzzi-purple.png`,
    image: `${baseUrl}/opengraph-image.png`,
    description:
      "Agência de marketing digital em Recife especializada em estratégia, criatividade e tecnologia para marcas e empresas.",
    email: "contato@agenciadyzzi.com.br",
    telephone: "+55 81 99677-5499",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Bom Jesus, 125",
      addressLocality: "Recife",
      addressRegion: "PE",
      postalCode: "50030-170",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Recife" },
      { "@type": "State", name: "Pernambuco" },
      { "@type": "Country", name: "Brasil" },
    ],
    sameAs: [links.instagram, links.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de marketing digital",
      itemListElement: siteContent.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.body,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
