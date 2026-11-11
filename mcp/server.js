#!/usr/bin/env node
// Read-only MCP server over the elon-musk-timeline dataset.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  meta, eraLabels, categoryLabels, eraEssays, wealth, grokipediaPages,
  events, eventById, eventView, searchableText, readDoc,
} from "./data.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const REF_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "assets", "references");
const refs = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(REF_DIR, "manifest.json"), "utf8")).items; } catch { return []; }
})();
const refView = (r) => ({
  file: path.join(REF_DIR, path.basename(r.file)), year: r.year, title: r.title, author: r.author,
  license: r.license, licenseUrl: r.licenseUrl, pageUrl: r.pageUrl, imageUrl: r.thumbUrl,
  attribution: `${r.author} / ${r.license} / ${r.pageUrl}`,
});
const lang = z.enum(["ko", "en"]).default("ko").describe("Output language. 'en' falls back to Korean text where no translation exists (see `translated`).");
const era = z.enum(Object.keys(eraLabels));
const category = z.enum(Object.keys(categoryLabels));
const json = (v) => ({ content: [{ type: "text", text: JSON.stringify(v, null, 2) }] });
const fail = (msg) => ({ isError: true, content: [{ type: "text", text: msg }] });

const server = new McpServer({ name: "elon-musk", version: "0.1.0" });

server.registerTool("musk_canon", {
  description:
    "Start here. What this dataset is and how to use it: the eras and categories, how many events, the source policy, the wording rules and the never-list. Call this once before answering questions about Elon Musk from this server.",
  inputSchema: {},
  annotations: { readOnlyHint: true },
}, async () => json({
  subject: "Elon Musk (born 1971-06-28, Pretoria). A real, living person: everything here is public-record fact, not a character.",
  title: meta.title,
  spine: meta.spine,
  lastVerified: meta.lastVerified,
  methodology: meta.methodology,
  counts: { events: events.length, P0: events.filter((e) => e.priority === "P0").length, P1: events.filter((e) => e.priority === "P1").length },
  eras: Object.entries(eraLabels).map(([id, l]) => ({ id, ko: l.ko, en: l.en, range: l.range, events: events.filter((e) => e.era === id).length })),
  categories: Object.entries(categoryLabels).map(([id, ko]) => ({ id, ko })),
  sourceTiers: { A: "primary encyclopedia / official record", B: "reputable secondary, cross-checked (2+ sources)" },
  wordingRules: [
    "Say what the record shows (led the Series A, became CEO), never 'founded Tesla'.",
    "No evaluation ('genius', 'fraud', 'hero') and no motive ('in order to', 'because of betrayal').",
    "Goals and forecasts (e.g. Mars dates) only with an explicit 'target/forecast' label.",
    "Net worth is a dated public-estimate snapshot, not an audited figure.",
    "Respect `caution` on an event when you repeat it.",
  ],
  never: [
    "unverified rumours or single-post social media claims",
    "private-life detail beyond the public record (e.g. listing every child by name)",
    "invented quotes: only quote text returned by get_event (grokipediaCitation)",
    "photoreal likeness prompts of the real person: this server serves facts, not an image identity",
  ],
  tools: ["get_references", "build_prompt", "list_events", "get_event", "search_events", "get_era", "get_wealth", "get_guide"],
}));

server.registerTool("list_events", {
  description: "List timeline events (compact: id, date, title, summary), oldest first. Filter by era, category, year range or priority.",
  inputSchema: {
    era: era.optional(),
    category: category.optional(),
    from_year: z.number().int().optional(),
    to_year: z.number().int().optional(),
    priority: z.enum(["P0", "P1"]).optional().describe("P0 = main spine only; omit for P0+P1."),
    lang,
    limit: z.number().int().min(1).max(200).default(60),
  },
  annotations: { readOnlyHint: true },
}, async (a) => {
  const rows = events.filter((e) =>
    (!a.era || e.era === a.era) && (!a.category || e.category === a.category) &&
    (a.from_year == null || e.year >= a.from_year) && (a.to_year == null || e.year <= a.to_year) &&
    (!a.priority || e.priority === a.priority));
  return json({ total: rows.length, shown: Math.min(rows.length, a.limit), events: rows.slice(0, a.limit).map((e) => eventView(e, a.lang)) });
});

server.registerTool("get_event", {
  description: "One event in full: detail, caution, sources with tiers, deep-copy context, the Grokipedia citation and image captions.",
  inputSchema: { id: z.string().describe("Event id, e.g. 'spacex-2002' (from list_events)."), lang },
  annotations: { readOnlyHint: true },
}, async ({ id, lang }) => {
  const e = eventById.get(id);
  if (!e) {
    const close = events.filter((x) => x.id.includes(id.toLowerCase())).slice(0, 8).map((x) => x.id);
    return fail(`No event '${id}'.${close.length ? ` Similar: ${close.join(", ")}` : " Use list_events or search_events to find ids."}`);
  }
  return json(eventView(e, lang, { full: true }));
});

server.registerTool("search_events", {
  description: "Free-text search over titles, summaries, details and deep copy. Returns the best matches, compact.",
  inputSchema: { query: z.string().min(1), lang, limit: z.number().int().min(1).max(50).default(10) },
  annotations: { readOnlyHint: true },
}, async ({ query, lang, limit }) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = events
    .map((e) => {
      const text = searchableText(e, lang);
      const title = eventView(e, lang).title.toLowerCase();
      const hits = terms.filter((t) => text.includes(t));
      return { e, score: hits.length === terms.length ? hits.length * 2 + terms.filter((t) => title.includes(t)).length : 0 };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.year - b.e.year);
  return json({ total: scored.length, events: scored.slice(0, limit).map((x) => eventView(x.e, lang)) });
});

server.registerTool("get_era", {
  description: "An era's label, year range, essay (lede + body) and its event ids.",
  inputSchema: { era, lang },
  annotations: { readOnlyHint: true },
}, async ({ era, lang }) => {
  const essay = eraEssays[era]?.[lang] ?? eraEssays[era]?.ko;
  return json({
    era, label: eraLabels[era][lang], range: eraLabels[era].range, essay,
    events: events.filter((e) => e.era === era).map((e) => eventView(e, lang)),
  });
});

server.registerTool("get_wealth", {
  description: "Net-worth snapshots by year (public estimates) with the disclaimer that must accompany any figure.",
  inputSchema: { lang },
  annotations: { readOnlyHint: true },
}, async ({ lang }) => json({
  disclaimer: wealth.disclaimer[lang],
  series: wealth.series.map((w) => ({ year: w.year, valueUsd: w.valueUsd, display: w.display, note: w.note[lang], source: w.source })),
}));

server.registerTool("get_guide", {
  description: "Method documents behind the dataset. 'sources': primary-source list and citation policy. 'rubric': which events are included or excluded and the copy rules.",
  inputSchema: { topic: z.enum(["sources", "rubric"]) },
  annotations: { readOnlyHint: true },
}, async ({ topic }) => ({
  content: [{ type: "text", text: readDoc(topic === "sources" ? "SOURCES.md" : "EVENT_RUBRIC.md") +
    (topic === "sources" ? `\n\nGrokipedia pages: ${Object.values(grokipediaPages).map((p) => p.url).join(", ")}` : "") }],
}));

server.registerTool("get_references", {
  description: "Openly licensed (CC0 / public domain / CC BY / CC BY-SA) reference photos of Elon Musk collected from Wikimedia Commons, 2005-2026, with local file path, author, license and source page. For studying likeness when drawing stylised illustration or caricature; credit the author when you publish anything that reuses a photo itself.",
  inputSchema: {
    from_year: z.number().int().optional(), to_year: z.number().int().optional(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  annotations: { readOnlyHint: true },
}, async ({ from_year, to_year, limit }) => {
  const rows = refs.filter((r) => (from_year == null || (r.year ?? 0) >= from_year) && (to_year == null || (r.year ?? 9999) <= to_year));
  return json({
    total: rows.length,
    note: "Reference only. Output must be a clearly stylised illustration, never a photoreal image or a fabricated scene. CC BY / CC BY-SA need attribution if the photo itself is shown.",
    images: rows.slice(0, limit).map(refView),
  });
});

// ---- build_prompt: stylised, clearly non-photographic illustration prompts -------------------
const STYLES = {
  "editorial-caricature": "editorial newspaper caricature illustration, exaggerated proportions, bold expressive ink lines, flat watercolor wash, visibly hand-drawn",
  "flat-vector": "flat vector illustration, simple geometric shapes, limited bold palette, clean outlines, poster style",
  "ink-sketch": "loose ink and pen sketch on cream paper, cross-hatching, sketchbook feel, visible pencil construction lines",
  "woodcut": "linocut woodcut print, chunky carved lines, two-colour ink on paper, vintage propaganda-poster composition",
  "pixel-art": "16-bit pixel art, chunky pixels, limited palette, retro video game scene",
  "low-poly": "low-poly 3D illustration, faceted shapes, flat shading, obviously stylised toy-like figure",
  "comic-panel": "comic book panel, halftone dots, thick outlines, speech-bubble-free composition",
};
const BLOCKED = /\b(nude|naked|nsfw|sexual|porn|gore|blood|corpse|child|children|kid|minor|swastika|nazi)\b/i;

server.registerTool("build_prompt", {
  description:
    "Compose a Midjourney prompt for a satirical or illustrated image about Elon Musk. Always a clearly non-photographic style (caricature, vector, ink, woodcut, pixel, low-poly, comic): never a photoreal likeness. Optionally anchor the scene to a timeline event so it shows something that really happened. Returns the prompt, parameters and a checklist.",
  inputSchema: {
    scene: z.string().min(3).describe("What the illustration shows, e.g. 'standing on a rocket booster holding a tiny flag, cartoon sea behind'."),
    style: z.enum(Object.keys(STYLES)).default("editorial-caricature"),
    event_id: z.string().optional().describe("Optional timeline event id; its title/date are added as grounding so the picture matches the record."),
    aspect: z.enum(["16:9", "4:5", "1:1", "3:2", "2:3", "9:16"]).default("4:5"),
    reference_year: z.number().int().optional().describe("Optional: use the openly licensed reference photo closest to this year as an image prompt, so the caricature's likeness follows how he looked then."),
    lang,
  },
  annotations: { readOnlyHint: true },
}, async ({ scene, style, event_id, aspect, reference_year, lang }) => {
  if (BLOCKED.test(scene)) return fail("Scene refused: no sexual, gory, hateful-symbol or child-related content in images of a real person.");
  let grounding = null;
  if (event_id) {
    const e = eventById.get(event_id);
    if (!e) return fail(`No event '${event_id}'. Use list_events to find ids.`);
    const v = eventView(e, "en");
    grounding = { id: e.id, date: v.date, title: v.title, caution: eventView(e, "en", { full: true }).caution };
  }
  let reference = null;
  if (reference_year != null) {
    const cands = refs.filter((r) => r.year != null).sort((a, b) => Math.abs(a.year - reference_year) - Math.abs(b.year - reference_year));
    if (!cands.length) return fail("No reference photos collected yet: run node scripts/collect-references.mjs");
    reference = refView(cands[0]);
  }
  const subject = "a satirical caricature of Elon Musk, drawn as an obvious cartoon figure";
  const prompt = [
    subject, scene.trim(),
    grounding ? `referencing the real event: ${grounding.title} (${grounding.date})` : null,
    STYLES[style],
    "clearly an illustration, not a photograph, not photorealistic",
    "no text, no letters, no logos, no captions",
  ].filter(Boolean).join(", ");
  return json({
    prompt: `${reference ? reference.imageUrl + " " : ""}${prompt} --ar ${aspect} --style raw${reference ? " --iw 0.7" : ""}`,
    reference,
    parameters: { aspect, style },
    grounding,
    checklist: [
      "Result must read as drawn/rendered, never as a photograph; re-roll if it looks photoreal.",
      "Show events as they happened (see grounding); do not invent scenes presented as real.",
      "Do not add made-up quotes or captions; type is drawn in code on top, if needed.",
      "Satire of public conduct is fine; keep it out of private life, family and appearance-shaming.",
      reference ? "The photo is only a likeness reference (--iw 0.7 keeps the style prompt in charge); if the output turns photographic, lower --iw or re-roll." : null,
      "If you publish it, label it as an illustration (and as AI-made where the platform asks).",
    ].filter(Boolean),
    note: grounding?.caution ? `Event caution: ${grounding.caution}` : undefined,
  });
});

await server.connect(new StdioServerTransport());
