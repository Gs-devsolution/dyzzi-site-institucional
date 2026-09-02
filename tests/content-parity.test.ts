import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { links, siteContent } from "../src/content/site-content.ts";

const EXPECTED_CONTENT_HASH =
  "67844fac7d0de02c2ad6ab220880a6b3ce1ac44b609b1afb127878e496f93f00";

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
});

test("os três cases em vídeo mantêm nomes e sequência aprovados", () => {
  assert.deepEqual(
    siteContent.projects.items.map(({ id, brand, title, category }) => ({
      id,
      brand,
      title,
      category,
    })),
    [
      {
        id: "dove-uv-repair",
        brand: "Dove",
        title: "UV Repair & Glow + Ferúlico",
        category: "Ativação de marca",
      },
      {
        id: "kabum-sana-2025",
        brand: "KaBuM!",
        title: "SANA 2025",
        category: "Cobertura de evento",
      },
      {
        id: "brahma-rua-n1-2026",
        brand: "Brahma",
        title: "Rua Nº1 — Copa 2026",
        category: "Experiência de marca",
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
