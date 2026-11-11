import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { closestReference, eraForYear, likenessForYear, resolveAspect } from "./prompt.js";

const mcpDir = path.dirname(fileURLToPath(import.meta.url));

assert.equal(eraForYear(2001), "late 1990s");
assert.equal(eraForYear(2002), "early 2000s");
assert.equal(eraForYear(2009), "early 2000s");
assert.equal(eraForYear(2010), "early 2010s");
assert.equal(eraForYear(2015), "early 2010s");
assert.equal(eraForYear(2016), "late 2010s");
assert.equal(eraForYear(2019), "late 2010s");
assert.equal(eraForYear(2020), "2020s");
assert.equal(eraForYear(2026), "2020s");
assert.match(likenessForYear(2024).text, /short dark-brown hair swept back with receding temples/);
assert.match(likenessForYear(2024).text, /strong square jaw/);
assert.match(likenessForYear(2024).text, /friendly editorial way/);
assert.match(likenessForYear(2012).text, /fuller hairline/);
assert.match(likenessForYear(2004).text, /less square/);
assert.doesNotMatch(likenessForYear(2024).text, /ugly|obese|fat\b/i);
assert.equal(resolveAspect("grok-imagine").aspect, "2:3");
assert.equal(resolveAspect("grok-imagine", "16:9").aspect, "16:9");
assert.deepEqual(resolveAspect("grok-imagine", "4:5"), { aspect: "2:3", requested: "4:5", mapped: true });
assert.equal(resolveAspect("midjourney").aspect, "4:5");
assert.equal(resolveAspect("midjourney", "9:16").aspect, "9:16");
const picked = closestReference([
  { year: 2011, title: "Group photo with Elon Musk.jpg", thumbUrl: "https://example.com/a" },
  { year: null, title: "Elon Musk at a 2012 event.jpg", thumbUrl: "https://example.com/title-year" },
  { year: 2012, title: "President meets Elon Musk.jpg", thumbUrl: "https://example.com/group" },
  { year: 2012, title: "Elon Musk 2012.jpg", thumbUrl: "https://upload.wikimedia.org/portrait" },
], 2012);
assert.equal(picked.thumbUrl, "https://upload.wikimedia.org/portrait");
assert.equal(closestReference([], 2012), null);
assert.equal(closestReference([{ year: null, title: "no year here.jpg" }], 2012), null);

const client = new Client({ name: "test", version: "0" });
await client.connect(new StdioClientTransport({ command: "node", args: ["server.js"], cwd: mcpDir }));
const call = async (name, args = {}) => {
  const r = await client.callTool({ name, arguments: args });
  const text = r.content[0].text;
  return { err: r.isError, text, json: r.isError ? null : (() => { try { return JSON.parse(text); } catch { return null; } })() };
};

const tools = (await client.listTools()).tools.map((t) => t.name).sort();
assert.deepEqual(tools, ["build_prompt", "get_era", "get_event", "get_guide", "get_references", "get_wealth", "list_events", "musk_canon", "search_events"]);

const canon = (await call("musk_canon")).json;
assert.equal(canon.counts.events, 118); assert.equal(canon.eras.length, 6);
assert.equal(canon.eras.reduce((n, e) => n + e.events, 0), 118);

const list = (await call("list_events", { era: "dual-bet", priority: "P0" })).json;
assert.ok(list.total > 0 && list.events.every((e) => e.era === "dual-bet" && e.priority === "P0"));
const years = (await call("list_events", { from_year: 2000, to_year: 2003, limit: 200 })).json.events.map((e) => e.year);
assert.ok(years.length && years.every((y) => y >= 2000 && y <= 2003));
assert.deepEqual(years, [...years].sort((a, b) => a - b));

const ev = (await call("get_event", { id: "spacex-2002", lang: "en" })).json;
assert.equal(ev.title, "Founds SpaceX"); assert.ok(ev.sources.length && ev.grokipediaCitation && ev.deep && ev.media);
const ko = (await call("get_event", { id: "spacex-2002" })).json;
assert.notEqual(ko.title, ev.title);
const det = (await call("get_event", { id: "grok-launch", lang: "en" })).json;
assert.equal(det.title, "Grok launch & version expansion");
const miss = await call("get_event", { id: "spacex" });
assert.ok(miss.err && miss.text.includes("spacex-2002"));

const s = (await call("search_events", { query: "falcon", lang: "en" })).json;
assert.ok(s.total > 0);
assert.equal((await call("search_events", { query: "zzzxqj" })).json.total, 0);

const era = (await call("get_era", { era: "scale", lang: "en" })).json;
assert.ok(era.essay?.title && era.events.length);
const w = (await call("get_wealth", { lang: "en" })).json;
assert.equal(w.series.length, 11); assert.ok(w.disclaimer);
assert.ok((await call("get_guide", { topic: "rubric" })).text.includes("Include"));
assert.ok((await call("get_guide", { topic: "sources" })).text.includes("grokipedia.com"));

const bp = (await call("build_prompt", { scene: "juggling tiny rockets", style: "woodcut", event_id: "spacex-2002", target: "midjourney" })).json;
assert.ok(bp.prompt.includes("not photorealistic") && bp.prompt.includes("woodcut") && bp.prompt.includes("--ar 4:5") && bp.prompt.includes("--style raw") && bp.grounding.title === "Founds SpaceX");
assert.equal(bp.target, "midjourney");
assert.ok((await call("build_prompt", { scene: "naked on a beach" })).err);
assert.ok((await call("build_prompt", { scene: "waving from a dock", headline: "naked" })).err);
assert.ok((await call("build_prompt", { topic: "a nude portrait on stage" })).err);
assert.ok((await call("build_prompt", { scene: "waving from a dock", event_id: "nope" })).err);
assert.ok((await call("build_prompt", { style: "ink-sketch" })).err);
assert.ok(!(await call("build_prompt", { scene: "waving from a dock" })).err);

const TOPIC = "xAI rewrote its RL and inference stack in C/C++ from scratch, based on software SpaceX engineers wrote for Starlink data transfer; Grok 4.8 RL stage, rolling out to Grok Bot users first";
const HEADLINE = "스타링크 코드로 AI를 학습한다?";
const withText = (await call("build_prompt", { topic: TOPIC, headline: HEADLINE, aspect: "16:9", reference_year: 2025 })).json;
assert.equal(withText.target, "grok-imagine");
assert.equal(withText.parameters.layout, "flow");
assert.equal(withText.ui.aspect, "16:9");
assert.equal(withText.ui.quality, "highest");
assert.equal(withText.korean_text.headline, HEADLINE);
assert.equal(withText.korean_text.caption, null);
assert.deepEqual(withText.korean_text.labels, []);
assert.equal(withText.korean_caption_suggestion, HEADLINE);
assert.ok(withText.prompt.includes(`"${HEADLINE}"`));
assert.ok(withText.prompt.includes("top banner"));
assert.ok(withText.prompt.includes("bold, clean Hangul sans-serif"));
assert.ok(withText.prompt.includes("Nothing else written."));
assert.ok(!withText.prompt.includes("C/C++"));
assert.ok(!withText.prompt.includes("--ar") && !withText.prompt.includes("--style") && !withText.prompt.includes("--iw"));
assert.ok(!/^https?:/i.test(withText.prompt.trim()));
assert.ok(!/faceless silhouettes/i.test(withText.prompt));
assert.match(withText.prompt, /only person in the picture/);
assert.match(withText.prompt, /left-to-right flow/);
assert.match(withText.prompt, /rule of thirds/);
assert.match(withText.prompt, /no clutter, no crowd, no extra people/);
assert.match(withText.prompt, /Left third, upper area: one large, clearly drawn Starlink-style flat-panel satellite in orbit above the curve of the Earth/);
assert.match(withText.prompt, /one continuous thick cable of light that sweeps in a smooth diagonal/);
assert.match(withText.prompt, /Centre third: the caricature of Elon Musk, waist-up, three-quarter view, slight low angle/);
assert.match(withText.prompt, /plugging it into the side of a big glowing spherical AI core/);
assert.match(withText.prompt, /His face is the focal point and the sharpest detail/);
assert.match(withText.prompt, /Right third: the large glowing AI core/);
assert.match(withText.prompt, /plain wooden crates with a few loose gears/);
assert.match(withText.prompt, /reserved only for the headline/);
assert.match(withText.prompt, /The eye should travel satellite, beam, Elon's face, AI core/);
assert.match(withText.prompt, /No letters or symbols inside any object, including the AI core/);
assert.match(withText.prompt, /wide 16:9 frame/);
assert.match(withText.prompt, /circa 2025/);
assert.match(withText.prompt, /line quality/i);
assert.match(withText.prompt, /palette/i);
assert.match(withText.prompt, /swept back/);
assert.match(withText.prompt, /2020s/);
assert.ok(withText.prompt.includes("not photorealistic"));
assert.ok(!/editorial newspaper/i.test(withText.prompt));
assert.ok(Array.isArray(withText.negative) && withText.negative.includes("newspaper masthead"));
assert.ok(withText.negative.includes("letters or symbols inside objects"));
assert.ok(withText.checklist.some((line) => /photograph/i.test(line) && /re-roll/i.test(line)));
assert.equal(withText.metaphor.discarded.includes("wooden crates"), true);

const noText = (await call("build_prompt", { topic: TOPIC, aspect: "16:9", reference_year: 2026 })).json;
assert.equal(noText.ui.aspect, "16:9");
assert.equal(noText.ui.quality, "highest");
assert.equal(noText.korean_text.headline, null);
assert.equal(noText.korean_caption_suggestion, null);
assert.ok(noText.prompt.includes("No English words, no newspaper masthead, no signage."));
assert.ok(noText.prompt.includes("no text, no letters"));
assert.ok(!noText.prompt.includes(HEADLINE));
assert.ok(!noText.prompt.includes("top banner"));
assert.ok(!noText.prompt.includes("speech bubble"));
assert.ok(!/editorial newspaper/i.test(noText.prompt));
assert.ok(!/mission control/i.test(noText.prompt));
assert.ok(!noText.prompt.includes("--ar"));
assert.ok(noText.negative.includes("signage"));
assert.ok(noText.negative.includes("english words"));
assert.ok(!noText.prompt.includes("C/C++"));
assert.match(noText.prompt, /Starlink-style flat-panel satellite/);
assert.match(noText.prompt, /left empty/);
assert.ok(!/reserved only for the headline/.test(noText.prompt));
assert.match(noText.prompt, /No letters or symbols inside any object/);

const labeled = (await call("build_prompt", {
  scene: "pointing at a glowing satellite",
  caption: "궤도 위 데이터",
  labels: ["스타링크", "학습"],
})).json;
assert.ok(labeled.prompt.includes('"궤도 위 데이터"'));
assert.ok(labeled.prompt.includes("speech bubble"));
assert.ok(labeled.prompt.includes('"스타링크"') && labeled.prompt.includes('"학습"'));
assert.ok(labeled.prompt.includes("small sign"));
assert.equal(labeled.korean_caption_suggestion, "궤도 위 데이터\n스타링크\n학습");
assert.equal(labeled.ui.aspect, "2:3");

const layered = (await call("build_prompt", { topic: TOPIC, headline: HEADLINE, aspect: "16:9", layout: "layers" })).json;
assert.equal(layered.parameters.layout, "layers");
assert.match(layered.prompt, /foreground/i);
assert.match(layered.prompt, /midground/i);
assert.match(layered.prompt, /background/i);
assert.ok(layered.prompt.includes(TOPIC));
assert.ok(!/faceless silhouettes/i.test(layered.prompt));

const custom = (await call("build_prompt", {
  topic: "a quiet afternoon outside",
  source: "a red kettle",
  link: "a blue hose",
  action: "pouring with the hose",
  result: "a yellow basin",
  discarded: "old cups",
})).json;
assert.match(custom.prompt, /a red kettle/);
assert.match(custom.prompt, /a blue hose/);
assert.match(custom.prompt, /pouring with the hose/);
assert.match(custom.prompt, /a yellow basin/);
assert.match(custom.prompt, /old cups/);
assert.match(custom.prompt, /Those objects are completely blank/);
assert.equal(custom.metaphor.source, "a red kettle");

const taxi = (await call("build_prompt", { topic: "robotaxi service opens on an empty street" })).json;
assert.match(taxi.prompt, /robotaxi/);
assert.ok(!/Starlink-style/i.test(taxi.prompt));
assert.equal(taxi.metaphor.discarded, null);
const optimus = (await call("build_prompt", { topic: "Optimus humanoid robot takes a step" })).json;
assert.match(optimus.prompt, /smooth blank face/);
const ship = (await call("build_prompt", { topic: "Starship flies toward Mars" })).json;
assert.match(ship.prompt, /Starship-style rocket/);
assert.match(ship.prompt, /small red planet/);
assert.ok((await call("build_prompt", { source: "a naked statue", result: "a stone pedestal" })).err);

const mapped = (await call("build_prompt", { scene: "waving from a dock", aspect: "4:5" })).json;
assert.equal(mapped.ui.aspect, "2:3");
assert.match(mapped.ui.aspect_note, /4:5/);
assert.ok(!mapped.prompt.includes("--ar"));
assert.equal((await call("build_prompt", { topic: "orbital ribbon test topic" })).json.ui.aspect, "2:3");

const gEvent = (await call("build_prompt", { scene: "juggling tiny rockets", style: "woodcut", event_id: "spacex-2002" })).json;
assert.equal(gEvent.target, "grok-imagine");
assert.equal(gEvent.grounding.title, "Founds SpaceX");
assert.match(gEvent.prompt, /woodcut/);
assert.match(gEvent.prompt, /early 2000s/);
assert.match(gEvent.prompt, /not photorealistic/);
assert.equal(gEvent.ui.quality, "highest");
assert.ok(!gEvent.prompt.includes("--ar"));
const mixedEra = (await call("build_prompt", { scene: "at a podium", event_id: "spacex-2002", reference_year: 2024 })).json;
assert.match(mixedEra.prompt, /2020s/);
assert.match(mixedEra.prompt, /swept back/);
assert.equal(mixedEra.grounding.title, "Founds SpaceX");

const rfAll = (await call("get_references", { limit: 100 })).json;
assert.match(rfAll.note, /stylised/i);
if (rfAll.total === 0) {
  assert.deepEqual(rfAll.images, []);
  const bpr = (await call("build_prompt", { scene: "at a podium", reference_year: 2012, target: "midjourney" })).json;
  assert.equal(bpr.reference, null);
  assert.equal(bpr.likeness.era, "early 2010s");
  assert.equal(bpr.likeness.source, "year");
  assert.match(bpr.prompt, /fuller hairline/);
  assert.ok(bpr.prompt.includes("not photorealistic") && bpr.prompt.includes("--ar 4:5") && bpr.prompt.includes("--style raw"));
  assert.ok(!bpr.prompt.includes("--iw"));
  assert.ok(!/^https?:/i.test(bpr.prompt.trim()));
  assert.match(bpr.note, /manifest.json/);
} else {
  const rf = (await call("get_references", { from_year: 2010, to_year: 2015, limit: 100 })).json;
  assert.ok(rf.total > 0 && rf.images.every((i) => i.year >= 2010 && i.year <= 2015 && i.license && i.pageUrl && i.attribution));
  const fsx = await import("node:fs");
  assert.ok(fsx.existsSync(rf.images[0].file));
  assert.equal(rfAll.total, 60);
  const bpr = (await call("build_prompt", { scene: "at a podium", reference_year: 2012, target: "midjourney" })).json;
  assert.ok(bpr.reference && Math.abs(bpr.reference.year - 2012) <= 1 && bpr.prompt.startsWith("https://upload.wikimedia.org") && bpr.prompt.includes("--iw 0.7") && bpr.prompt.includes("not photorealistic"));
  assert.equal(bpr.likeness.source, "reference");
  const gref = (await call("build_prompt", { scene: "at a podium", reference_year: 2012 })).json;
  assert.ok(gref.reference && Math.abs(gref.reference.year - 2012) <= 1);
  assert.ok(!gref.prompt.includes(gref.reference.imageUrl));
  assert.ok(!gref.prompt.includes("--iw") && !gref.prompt.includes("--ar"));
  assert.match(gref.prompt, /early 2010s/);
}
assert.ok(!(await call("build_prompt", { scene: "at a podium" })).json.prompt.includes("--iw"));

// every event renders in both languages without throwing
for (const e of list.events) for (const l of ["ko", "en"]) assert.ok(!(await call("get_event", { id: e.id, lang: l })).err);
console.log("OK: all checks passed, tools:", tools.join(", "));
await client.close();
