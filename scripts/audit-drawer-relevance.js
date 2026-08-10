#!/usr/bin/env node
/**
 * Full drawer-relevance audit (mirrors js/app.js presentation rules).
 * Run: node scripts/audit-drawer-relevance.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of [
  "data/events.js",
  "data/en.js",
  "data/detail-events.js",
  "data/deep-copy.js",
  "data/grokipedia.js",
  "data/wealth.js",
]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
}

const events = ctx.window.TIMELINE_EVENTS;
const EN = (ctx.window.TIMELINE_EN && ctx.window.TIMELINE_EN.events) || {};
const DETAIL_EN = ctx.window.DETAIL_EVENTS_EN || {};

function getEventKind(ev) {
  const cat = ev.category;
  if (cat === "personal") return "personal";
  if (cat === "life") return "life";
  if (cat === "edu") return "edu";
  if (cat === "politics") return "politics";
  if (cat === "media") {
    if (/^(twitter-2022|x-rebrand-2023|twitter-stake|twitter-deal-close|x-premium)/i.test(ev.id)) {
      return "media-platform";
    }
    return "media-speech";
  }
  return "venture";
}

function profileFlags(kind) {
  return {
    personal: { wealth: false, era: false },
    life: { wealth: false, era: false },
    edu: { wealth: false, era: false },
    politics: { wealth: false, era: true },
    "media-speech": { wealth: false, era: false },
    "media-platform": { wealth: true, era: true },
    venture: { wealth: true, era: true },
  }[kind];
}

function isCitationRelevant(ev, citeText) {
  if (!citeText || !String(citeText).trim()) return false;
  const hay = String(citeText).toLowerCase();
  if (/existential challenges for humanity/i.test(hay)) {
    return ev.id === "spacex-2002" || ev.id === "xai-2023";
  }
  const idTokens = String(ev.id)
    .split(/[-_]/)
    .filter((p) => p.length >= 3 && !/^\d+$/.test(p))
    .map((p) => p.toLowerCase());
  if (idTokens.some((t) => hay.includes(t))) return true;

  const anchors = new Set(idTokens);
  const en = DETAIL_EN[ev.id] || EN[ev.id] || {};
  ((en.title || "") + " " + (en.summary || "") + " " + ev.title + " " + ev.summary)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4)
    .forEach((w) => anchors.add(w));
  ["elon", "musk", "with", "from", "that", "this", "after", "before", "public", "first"].forEach((s) =>
    anchors.delete(s)
  );
  let hits = 0;
  anchors.forEach((a) => {
    if (hay.includes(a)) hits++;
  });
  return citeText.length < 160 ? hits >= 1 : hits >= 2;
}

function relatedEvents(ev, limit = 6) {
  const affinity = {
    edu: ["edu", "life"],
    life: ["life", "edu"],
    personal: ["personal"],
    politics: ["politics", "media"],
    media: ["media", "politics"],
    ai: ["ai"],
    spacex: ["spacex"],
    tesla: ["tesla"],
    company: ["company"],
  };
  const strict = new Set(["personal", "politics", "edu", "life"]);
  const allowed = new Set(affinity[ev.category] || [ev.category]);
  const kind = getEventKind(ev);
  return events
    .filter((e) => e.id !== ev.id)
    .map((e) => {
      const yd = Math.abs((e.year || 0) - (ev.year || 0));
      const sameCat = e.category === ev.category;
      const aff = allowed.has(e.category);
      let score = 0;
      if (sameCat) score += 16;
      else if (aff) score += 7;
      else score -= 10;
      if (e.category === "personal" && ev.category !== "personal") score -= 50;
      if (ev.category === "personal" && e.category !== "personal") score -= 50;
      if (kind === "media-speech" && getEventKind(e) === "media-speech") score += 5;
      if (strict.has(ev.category) && !aff) score -= 20;
      if (e.era === ev.era) score += 2;
      if (yd <= 2) score += 6;
      else if (yd <= 4) score += 4;
      else if (yd <= 8) score += 2;
      else if (sameCat && yd <= 25) {
        const sparse = ["life", "edu", "personal"].includes(ev.category);
        score += sparse ? 4 : -8;
      } else if (!sameCat) score -= 4;
      return { e, score };
    })
    .filter((x) => x.score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
}

const byKind = {};
let mission = 0;
let personalLeak = 0;
let emptySources = 0;
let suppressedCite = 0;
let shownCite = 0;
const samples = [];

for (const ev of events) {
  const kind = getEventKind(ev);
  byKind[kind] = (byKind[kind] || 0) + 1;
  const flags = profileFlags(kind);
  if (!(ev.sources || []).length) emptySources++;

  const cite = ev.citation && (ev.citation.en || ev.citation.ko);
  if (cite) {
    if (/existential challenges for humanity/i.test(cite.en || cite)) mission++;
    if (isCitationRelevant(ev, cite)) shownCite++;
    else suppressedCite++;
  }

  for (const r of relatedEvents(ev)) {
    if (ev.category === "personal" && r.category !== "personal") personalLeak++;
    if (ev.category !== "personal" && r.category === "personal") personalLeak++;
  }

  // sample few for report
  if (
    [
      "amber-heard-2016",
      "stock-too-high-2020",
      "bird-is-freed-2022",
      "twitter-2022",
      "trump-endorse-2024",
      "sec-2018",
      "queens-1989",
      "birth-1971",
      "spacex-2002",
    ].includes(ev.id)
  ) {
    samples.push({
      id: ev.id,
      kind,
      wealth: flags.wealth,
      era: flags.era,
      citeShown: !!(cite && isCitationRelevant(ev, cite)),
      related: relatedEvents(ev, 4).map((r) => r.id),
    });
  }
}

console.log("=== by kind ===");
console.log(byKind);
console.log("events", events.length);
console.log("missionQuote still attached", mission);
console.log("personal related leaks", personalLeak);
console.log("empty sources", emptySources);
console.log("citations shown (relevant)", shownCite);
console.log("citations suppressed (irrelevant)", suppressedCite);
console.log("\n=== samples ===");
samples.forEach((s) => console.log(JSON.stringify(s)));

const fail = mission || personalLeak || emptySources;
if (fail) {
  console.error("FAIL");
  process.exit(1);
}
console.log("\nOK");
