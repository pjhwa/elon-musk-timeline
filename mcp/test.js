import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client({ name: "test", version: "0" });
await client.connect(new StdioClientTransport({ command: "node", args: ["server.js"] }));
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

const bp = (await call("build_prompt", { scene: "juggling tiny rockets", style: "woodcut", event_id: "spacex-2002" })).json;
assert.ok(bp.prompt.includes("not photorealistic") && bp.prompt.includes("woodcut") && bp.prompt.includes("--ar 4:5") && bp.grounding.title === "Founds SpaceX");
assert.ok((await call("build_prompt", { scene: "naked on a beach" })).err);
assert.ok((await call("build_prompt", { scene: "waving", event_id: "nope" })).err);
assert.ok(!(await call("build_prompt", { scene: "waving" })).err);

const rf = (await call("get_references", { from_year: 2010, to_year: 2015, limit: 100 })).json;
assert.ok(rf.total > 0 && rf.images.every((i) => i.year >= 2010 && i.year <= 2015 && i.license && i.pageUrl && i.attribution));
const fsx = await import("node:fs");
assert.ok(fsx.existsSync(rf.images[0].file));
assert.equal((await call("get_references", { limit: 100 })).json.total, 60);
const bpr = (await call("build_prompt", { scene: "at a podium", reference_year: 2012 })).json;
assert.ok(bpr.reference && Math.abs(bpr.reference.year - 2012) <= 1 && bpr.prompt.startsWith("https://upload.wikimedia.org") && bpr.prompt.includes("--iw 0.7") && bpr.prompt.includes("not photorealistic"));
assert.ok(!(await call("build_prompt", { scene: "at a podium" })).json.prompt.includes("--iw"));

// every event renders in both languages without throwing
for (const e of list.events) for (const l of ["ko", "en"]) assert.ok(!(await call("get_event", { id: e.id, lang: l })).err);
console.log("OK: all checks passed, tools:", tools.join(", "));
await client.close();
