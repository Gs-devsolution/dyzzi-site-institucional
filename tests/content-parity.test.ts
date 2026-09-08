import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { casesCatalog, publishedCases } from "../src/content/cases.ts";
import { links, siteContent } from "../src/content/site-content.ts";
import {
  seoKeywordGroups,
  seoKeywords,
  seoSearchGroups,
  seoSearchPhrases,
} from "../src/content/seo-catalog.ts";

const EXPECTED_CONTENT_HASH =
  "ab87863202d9717734a0cfeea568e82f174385ff5bdc768b93194aac3cdb466d";

test("a copy congelada permanece literal", () => {
  const hash = createHash("sha256")
    .update(JSON.stringify({ siteContent, links }))
    .digest("hex");

  assert.equal(hash, EXPECTED_CONTENT_HASH);
});

test("as quantidades editoriais obrigatórias permanecem completas", () => {
  assert.equal(siteContent.services.items.length, 6);
  assert.equal(siteContent.projects.items.length, 3);
  assert.equal(siteContent.clients.items.length, 9);
  assert.equal(siteContent.testimonials.items.length, 5);
  assert.equal(siteContent.staff.members.length, 2);
});

test("o staff mantém nomes, cargos e contatos aprovados", () => {
  assert.deepEqual(siteContent.staff.members, [
    {
      name: "Dayane Araujo",
      role: "CEO | Head de Comunicação",
      email: "dayane@agenciadyzzi.com.br",
    },
    {
      name: "Gabriel Fernando",
      role: "CFO | Head de Tecnologia",
      email: "gabriel@agenciadyzzi.com.br",
    },
  ]);
});

test("os três cases em vídeo mantêm nomes e sequência aprovados", () => {
  assert.deepEqual(
    siteContent.projects.items.map(({ id, service, project }) => ({
      id,
      service,
      project,
    })),
    [
      {
        id: "activation-case-01",
        service: "Ativação de marca",
        project: "Dove — UV Repair & Glow + Ferúlico",
      },
      {
        id: "kabum-sana-2025",
        service: "Cobertura audiovisual",
        project: "SANA 2025 — KaBuM!",
      },
      {
        id: "audiovisual-case-03",
        service: "Cobertura audiovisual",
        project: "Rua Nº1 Brahma — Copa 2026",
      },
    ],
  );
});

test("links oficiais permanecem congelados", () => {
  assert.deepEqual(links, {
    whatsapp:
      "https://api.whatsapp.com/message/WKUAE2TTJXNWD1?autoload=1&app_absent=0",
    email: "mailto:contato@agenciadyzzi.com.br",
    instagram: "https://www.instagram.com/agenciadyzzi",
    linkedin: "https://www.linkedin.com/company/ag%C3%AAnciadyzzi/",
    cases: "/cases",
    careers: "https://linktr.ee/agenciadyzzi",
  });
});

test("a navegação interna funciona também fora da home", () => {
  assert.deepEqual(
    siteContent.navigation.map(({ label, href }) => ({ label, href })),
    [
      { label: "Página Inicial", href: "/#home" },
      { label: "Sobre a DYZZI", href: "/#sobre" },
      { label: "Nossos Serviços", href: "/#servicos" },
      { label: "Cases", href: "/cases" },
      { label: "Contatos", href: "/#contatos" },
    ],
  );
  assert.equal(siteContent.projects.portfolioCta, "Explorar cases");
});

test("o catálogo de cases diferencia publicação e curadoria", () => {
  assert.equal(casesCatalog.length, 3);
  assert.equal(publishedCases.length, 1);
  assert.equal(publishedCases[0]?.slug, "sana-2025-kabum");
  assert.deepEqual(
    casesCatalog.map(({ title, status }) => ({ title, status })),
    [
      { title: "SANA 2025 — KaBuM!", status: "published" },
      { title: "Case em curadoria 02", status: "curating" },
      { title: "Case em curadoria 03", status: "curating" },
    ],
  );

  const publicCaseText = JSON.stringify(casesCatalog);
  assert.equal(publicCaseText.includes("Dove"), false);
  assert.equal(publicCaseText.includes("Brahma"), false);

  const curatingItems = casesCatalog.filter(
    (item) => item.status === "curating",
  );
  assert.ok(curatingItems.every((item) => item.slug === null));
  assert.ok(
    curatingItems.every(
      (item) => item.curatorialLabel === "Conteúdo em curadoria",
    ),
  );
});

test("todos os ativos obrigatórios estão locais", () => {
  const assets = [
    ...siteContent.projects.items.flatMap(({ mp4, poster }) => [mp4, poster]),
    ...siteContent.clients.items.map(({ file }) => `/clients/${file}`),
    ...siteContent.services.items.map(({ icon }) => icon),
    "/brand/dyzzi-white.png",
    "/brand/dyzzi-purple.png",
    "/brand/dyzzi-mark-purple.png",
    "/brand/dyzzi-pattern.png",
    "/media/simbolo-3d.png",
    ...publishedCases.flatMap((item) => [
      item.hero.kind === "video" ? item.hero.poster : item.hero.src,
      ...item.gallery.flatMap((block) => {
        const media = Array.isArray(block.media) ? block.media : [block.media];
        return media.flatMap((entry) =>
          entry.kind === "video" ? [entry.src, entry.poster] : [entry.src],
        );
      }),
    ]),
  ];

  for (const asset of assets) {
    assert.ok(existsSync(`public${asset}`), `Ativo ausente: ${asset}`);
  }
});

test("o mapa SEO mantém 100 buscas e 100 palavras-chave únicas", () => {
  assert.equal(seoSearchPhrases.length, 100);
  assert.equal(seoKeywords.length, 100);
  assert.equal(new Set(seoSearchPhrases).size, 100);
  assert.equal(new Set(seoKeywords).size, 100);
  assert.deepEqual(
    seoSearchGroups.flatMap((group) => group.terms),
    [...seoSearchPhrases],
  );
  assert.deepEqual(
    seoKeywordGroups.flatMap((group) => group.terms),
    [...seoKeywords],
  );
});
