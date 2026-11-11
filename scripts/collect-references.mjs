#!/usr/bin/env node
/**
 * Collect openly licensed reference photos of Elon Musk from Wikimedia Commons.
 * Only CC0 / public domain / CC BY / CC BY-SA files are kept; credit + license + page URL
 * are recorded in assets/references/manifest.json (attribution is required for CC BY*).
 *
 * Run:  node scripts/collect-references.mjs [--max 60] [--width 1280]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets", "references");
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? Number(process.argv[i + 1]) : d; };
const MAX = arg("max", 60);
const WIDTH = arg("width", 1280);
const UA = "elon-timeline-reference-collector/0.1 (local research tool; Wikimedia Commons API etiquette)";
const QUERIES = [
  "Elon Musk", "Elon Musk portrait", "Elon Musk speaking", "Elon Musk conference", "Elon Musk SpaceX",
  "Elon Musk Tesla", "Elon Musk 2010s", "Elon Musk 2020s", "Elon Musk Starship", "Elon Musk interview",
];
const OK_LICENSE = /^(cc0|pd\b|public domain|cc[- ]by(-sa)?[- ]\d)/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s = "") => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function api(params) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", ...params });
  return (await politeFetch(url)).json();
}

/** GET with Retry-After / exponential backoff on 429 and 5xx. */
async function politeFetch(url, tries = 6) {
  for (let n = 0; ; n++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r;
    if (n >= tries || (r.status !== 429 && r.status < 500)) throw new Error(`${r.status} ${url}`);
    const wait = Math.max(Number(r.headers.get("retry-after")) * 1000 || 0, 2000 * 2 ** n);
    console.log(`  ${r.status}, waiting ${Math.round(wait / 1000)}s`);
    await sleep(wait);
  }
}

const found = new Map();
for (const q of QUERIES) {
  let cont = {};
  for (let page = 0; page < 3; page++) {
    const j = await api({
      action: "query", generator: "search", gsrnamespace: "6", gsrsearch: q, gsrlimit: "50",
      prop: "imageinfo", iiprop: "url|extmetadata|size|mime", iiurlwidth: String(WIDTH), ...cont,
    });
    for (const p of Object.values(j.query?.pages ?? {})) {
      const ii = p.imageinfo?.[0];
      if (!ii || !/^image\/(jpeg|png)$/.test(ii.mime) || ii.width < 800) continue;
      const m = ii.extmetadata ?? {};
      const license = strip(m.LicenseShortName?.value);
      if (!OK_LICENSE.test(license)) continue;
      const cats = strip(m.Categories?.value);
      // must actually be about him: title or Commons categories mention Musk
      if (!/musk/i.test(p.title) && !/elon musk/i.test(cats)) continue;
      // crowd / group shots make poor likeness references
      if (/group|crowd|audience|panel|caricature|tweet|community notes|putin|meme|cartoon|logo|screenshot|poster/i.test(p.title)) continue;
      if (/&/.test(p.title)) continue; // two-person shots
      found.set(p.title, {
        title: p.title.replace(/^File:/, ""),
        year: Number((strip(m.DateTimeOriginal?.value) || strip(m.DateTime?.value)).match(/(19|20)\d\d/)?.[0]) || null,
        width: ii.width, height: ii.height,
        thumbUrl: ii.thumburl, pageUrl: ii.descriptionurl,
        author: strip(m.Artist?.value) || "unknown",
        license, licenseUrl: m.LicenseUrl?.value ?? null,
        description: strip(m.ImageDescription?.value).slice(0, 300),
        personalityRightsWarning: /personality rights/i.test(cats),
      });
    }
    if (!j.continue) break;
    cont = j.continue;
    await sleep(1500);
  }
  await sleep(1500);
}

// Diversity: one event/photographer series yields many near-identical frames, so cap each series,
// then round-robin across years (newest first) instead of taking the newest N.
const seriesKey = (it) => it.title.match(/\((\d{5})/)?.[1] ?? it.title.replace(/\W+/g, " ").slice(0, 18);
const perSeries = new Map();
const byYear = new Map();
for (const it of found.values()) {
  const k = seriesKey(it);
  const n = perSeries.get(k) ?? 0;
  if (n >= 3) continue;
  perSeries.set(k, n + 1);
  const y = it.year ?? 0;
  byYear.set(y, [...(byYear.get(y) ?? []), it]);
}
const years = [...byYear.keys()].sort((a, b) => b - a);
const picked = [];
for (let round = 0; picked.length < MAX; round++) {
  let any = false;
  for (const y of years) {
    const it = byYear.get(y)[round];
    if (it && picked.length < MAX) { picked.push(it); any = true; }
  }
  if (!any) break;
}
await fs.mkdir(OUT, { recursive: true });
const manifest = [];
for (const [i, it] of picked.entries()) {
  const ext = it.thumbUrl.match(/\.(jpe?g|png)/i)?.[1].toLowerCase().replace("jpeg", "jpg") ?? "jpg";
  const file = `ref-${String(i + 1).padStart(3, "0")}.${ext}`;
  try {
    const r = await politeFetch(it.thumbUrl);
    await fs.writeFile(path.join(OUT, file), Buffer.from(await r.arrayBuffer()));
    manifest.push({ file: `assets/references/${file}`, ...it });
    console.log(`ok   ${file}  ${it.year ?? "----"}  ${it.license}  ${it.title}`);
  } catch (e) {
    console.log(`FAIL ${it.title}: ${e.message}`);
  }
  await sleep(1200);
}
await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify({
  collectedAt: new Date().toISOString(),
  source: "Wikimedia Commons",
  note: "CC BY / CC BY-SA require attribution (author + license + link). Reference for stylised illustration only, not for photoreal output or fabricated scenes.",
  items: manifest,
}, null, 2));
console.log(`\n${manifest.length} images saved to ${path.relative(ROOT, OUT)} (candidates found: ${found.size})`);
