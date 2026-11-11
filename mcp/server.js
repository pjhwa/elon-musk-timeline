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
import {
  BLOCKED, STYLE_KEYS, ASPECTS, closestReference, refYear, buildIllustrationPrompt,
} from "./prompt.js";
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

server.registerTool("build_prompt", {
  description:
    "Compose a satirical illustration prompt of Elon Musk for Grok Imagine (default) or Midjourney. Always a clearly non-photographic caricature, never a photoreal likeness. Grok Imagine default layout is a left-to-right magazine-cover flow (source, beam, Elon, result) in natural-language prose, plus ui.aspect and ui.quality. layout 'layers' keeps the older foreground/midground/background staging. Imagine ignores --ar, --style, --iw, and image URLs. Optional source, link, action, result, and discarded fill the metaphor; otherwise they are derived from topic or scene. Optional headline, caption, and labels are Korean strings to render exactly. Optional event_id anchors a real timeline event. reference_year selects an era likeness from assets/references/manifest.json when that file exists, and still works from the year alone when it does not.",
  inputSchema: {
    scene: z.string().min(3).optional().describe("What the illustration shows. Optional when topic, event_id, or metaphor parts are set. Used as keyword text for the flow metaphor."),
    topic: z.string().min(3).optional().describe("Free text turned into the metaphor, e.g. a recent news item. Not lettered in the picture."),
    style: z.enum(STYLE_KEYS).default("editorial-caricature"),
    layout: z.enum(["flow", "layers"]).default("flow").describe("Grok Imagine composition. flow (default) is one left-to-right story. layers is foreground, midground, and background."),
    target: z.enum(["grok-imagine", "midjourney"]).default("grok-imagine").describe("grok-imagine (default) returns prose plus UI settings. midjourney keeps --ar, --style raw, and an optional reference-photo URL."),
    event_id: z.string().optional().describe("Optional timeline event id. Its title and date ground the picture in the record."),
    aspect: z.enum(ASPECTS).optional().describe("Frame ratio. Grok Imagine default 2:3, chosen in the UI. Midjourney default 4:5, written as --ar. 4:5 is mapped to 2:3 for Grok Imagine. Imagine also offers 3:2, 1:1, 16:9, 9:16."),
    reference_year: z.number().int().optional().describe("Era of the caricature. Uses the closest assets/references/manifest.json photo (year, then title) when the file exists. The written likeness still works if that folder is missing. Only Midjourney receives the photo URL."),
    headline: z.string().min(1).max(160).optional().describe("Korean title rendered exactly, in a top banner. Quoted verbatim. No other writing."),
    caption: z.string().min(1).max(80).optional().describe("Short Korean caption rendered exactly, inside one speech bubble."),
    labels: z.array(z.string().min(1).max(40)).max(6).optional().describe("Short Korean words, one per small sign, and no other writing."),
    source: z.string().min(3).max(240).optional().describe("Left-third cause object. Derived from the topic when omitted."),
    link: z.string().min(3).max(240).optional().describe("The one continuous beam or cable from the source to the centre."),
    action: z.string().min(3).max(240).optional().describe("What Elon does with the link, as a verb phrase, e.g. 'catching the cable and plugging it in'."),
    result: z.string().min(3).max(240).optional().describe("Right-third result object."),
    discarded: z.string().min(3).max(240).optional().describe("Optional blank pile of the old thing thrown out, lower right. Derived when the topic is a replacement."),
    lang,
  },
  annotations: { readOnlyHint: true },
}, async ({ scene, topic, style, layout, target, event_id, aspect, reference_year, headline, caption, labels, source, link, action, result, discarded, lang }) => {
  const cleanScene = scene?.trim();
  const cleanTopic = topic?.trim();
  const cleanHeadline = headline?.trim();
  const cleanCaption = caption?.trim();
  const cleanLabels = (labels ?? []).map((s) => s.trim()).filter(Boolean);
  const cleanSource = source?.trim();
  const cleanLink = link?.trim();
  const cleanAction = action?.trim();
  const cleanResult = result?.trim();
  const cleanDiscarded = discarded?.trim();
  if (!cleanScene && !cleanTopic && !event_id && !cleanSource && !cleanResult) {
    return fail("Provide a scene, a topic, an event_id, or metaphor source and result.");
  }
  const blob = [cleanScene, cleanTopic, cleanHeadline, cleanCaption, cleanSource, cleanLink, cleanAction, cleanResult, cleanDiscarded, ...cleanLabels].filter(Boolean).join("\n");
  if (BLOCKED.test(blob)) return fail("Scene refused: no sexual, gory, hateful-symbol or child-related content in images of a real person.");
  let grounding = null;
  let eventYear = null;
  if (event_id) {
    const e = eventById.get(event_id);
    if (!e) return fail(`No event '${event_id}'. Use list_events to find ids.`);
    const v = eventView(e, "en");
    grounding = { id: e.id, date: v.date, title: v.title, caution: eventView(e, "en", { full: true }).caution || null };
    eventYear = e.year;
  }
  const requestedYear = reference_year ?? eventYear ?? new Date().getUTCFullYear();
  const picked = reference_year != null ? closestReference(refs, reference_year) : null;
  const reference = picked ? refView(picked) : null;
  const likenessYear = picked ? refYear(picked) : requestedYear;
  const built = buildIllustrationPrompt({
    target, scene: cleanScene, topic: cleanTopic, style, layout, aspect, grounding,
    likenessYear, referenceUrl: reference?.imageUrl ?? null, hasReference: Boolean(reference),
    headline: cleanHeadline, caption: cleanCaption, labels: cleanLabels,
    source: cleanSource, link: cleanLink, action: cleanAction, result: cleanResult, discarded: cleanDiscarded,
  });
  if (reference_year != null) built.likeness.requested_year = reference_year;
  built.likeness.source = reference ? "reference" : "year";
  const notes = [];
  if (reference_year != null && !reference) {
    notes.push("No dated photos in assets/references/manifest.json. Likeness is described from reference_year only.");
  } else if (reference && refYear(picked) !== reference_year) {
    notes.push(`Nearest reference photo is ${refYear(picked)} (${picked.title}), so the caricature uses that year's look.`);
  }
  if (grounding?.caution) notes.push(`Event caution: ${grounding.caution}`);
  if (lang === "en" && (cleanHeadline || cleanCaption || cleanLabels.length)) {
    notes.push("Korean strings are quoted inside the English prompt so the image model copies them.");
  }
  return json({
    ...built,
    reference,
    grounding,
    note: notes.length ? notes.join(" ") : undefined,
  });
});

await server.connect(new StdioServerTransport());
