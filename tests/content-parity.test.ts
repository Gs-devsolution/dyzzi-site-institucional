import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { links, siteContent } from "../src/content/site-content.ts";
import {
  seoKeywordGroups,
  seoKeywords,
  seoSearchGroups,
  seoSearchPhrases,
} from "../src/content/seo-catalog.ts";

const EXPECTED_CONTENT_HASH =
  "7175b7d096c31a10f7040c4b3261964218c4e198ff4dae4eee520a5f2b8f0144";

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
    portfolio: "https://portfolio.agenciadyzzi.com.br/",
    careers: "https://linktr.ee/agenciadyzzi",
  });
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
