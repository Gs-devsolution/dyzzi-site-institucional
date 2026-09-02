import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { links, siteContent } from "../src/content/site-content.ts";

const EXPECTED_CONTENT_HASH =
  "a7714530cb17c588b5f83a90bcef3c15a18fe5b7ff018e859aea1d93e54d1710";

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
