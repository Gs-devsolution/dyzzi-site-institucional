import type { Metadata, Viewport } from "next";
import {
  Montserrat,
  Parisienne,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import localFont from "next/font/local";
import { MetaPixel } from "@/components/meta-pixel";
import { StructuredData } from "@/components/structured-data";
import { VLibras } from "@/components/vlibras";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const poppinsSemibold = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "600",
  display: "optional",
});

const poppinsBold = Poppins({
  variable: "--font-poppins-bold",
  subsets: ["latin"],
  weight: "700",
  display: "optional",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: "600",
  style: "italic",
  display: "optional",
  preload: false,
});

const engravers = localFont({
  src: "./fonts/engravers-gothic-bt.ttf",
  variable: "--font-engravers",
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Agência de Marketing Digital em Recife | DYZZI",
  description:
    "Agência de marketing digital em Recife especializada em branding, gestão de redes sociais, produção de conteúdo, design gráfico, tráfego pago, sistemas e automações.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Agência DYZZI",
    title: "Agência de Marketing Digital em Recife | DYZZI",
    description:
      "Estratégia, branding, redes sociais, conteúdo, design, tráfego pago e automações para marcas e empresas.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Agência DYZZI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agência de Marketing Digital em Recife | DYZZI",
    description:
      "Estratégia, branding, redes sociais, conteúdo, design, tráfego pago e automações para marcas e empresas.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1C0828",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppinsSemibold.variable} ${poppinsBold.variable} ${montserrat.variable} ${parisienne.variable} ${playfair.variable} ${engravers.variable}`}
    >
      <body>
        <StructuredData />
        {children}
        <VLibras />
        <MetaPixel />
      </body>
    </html>
  );
}
