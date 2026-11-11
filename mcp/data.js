// Loads the timeline's browser-style data files (window.X = ...) into plain objects.
import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "data");

export function loadWindow() {
  const win = {};
  const ctx = vm.createContext({ window: win });
  for (const f of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".js")).sort()) {
    vm.runInContext(fs.readFileSync(path.join(DATA_DIR, f), "utf8"), ctx, { filename: f });
  }
  return win;
}

export function readDoc(name) {
  return fs.readFileSync(path.join(ROOT, "docs", name), "utf8");
}

const W = loadWindow();

export const meta = W.TIMELINE_META;
export const eraLabels = W.ERA_LABELS;
export const categoryLabels = W.CATEGORY_LABELS;
export const eraEssays = W.ERA_ESSAYS;
export const wealth = { series: W.WEALTH_SERIES, disclaimer: W.WEALTH_DISCLAIMER };
export const grokipediaPages = W.GROKIPEDIA.pages;

const EN_EVENTS = { ...W.TIMELINE_EN.events, ...W.DETAIL_EVENTS_EN };
const base = [...W.TIMELINE_EVENTS, ...W.DETAIL_EVENTS];

/** Event in the requested language, with deep copy / citation / media merged in. */
export function eventView(e, lang = "ko", { full = false } = {}) {
  const en = lang === "en" ? EN_EVENTS[e.id] : null;
  const out = {
    id: e.id,
    date: e.date,
    year: e.year,
    era: e.era,
    category: e.category,
    priority: e.priority,
    title: en?.title ?? e.title,
    summary: en?.summary ?? e.summary,
    translated: lang === "en" ? Boolean(en) : true,
  };
  if (!full) return out;
  out.detail = en?.detail ?? e.detail;
  out.caution = en && "caution" in en ? en.caution : e.caution;
  out.sources = e.sources;
  const deep = W.DEEP_COPY[e.id]?.[lang];
  if (deep) out.deep = deep;
  const cite = W.GROKIPEDIA_CITE[e.id];
  if (cite) out.grokipediaCitation = { pages: cite.pages, text: cite[lang] ?? cite.en };
  const media = W.EVENT_MEDIA[e.id];
  if (media) {
    out.media = media.map((m) => ({
      src: m.src,
      caption: m.caption?.[lang] ?? m.caption?.en,
      credit: m.credit,
      license: m.license,
    }));
  }
  return out;
}

export const events = base.sort((a, b) => a.year - b.year || String(a.date).localeCompare(String(b.date)));
export const eventById = new Map(events.map((e) => [e.id, e]));

export function searchableText(e, lang) {
  const v = eventView(e, lang, { full: true });
  return [v.title, v.summary, v.detail, v.deep?.body, ...(v.deep?.bullets ?? [])].filter(Boolean).join(" ").toLowerCase();
}
