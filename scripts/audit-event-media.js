#!/usr/bin/env node
/**
 * Verify EVENT_MEDIA: files exist, anchors match host event, no orphan keys.
 * Run: node scripts/audit-event-media.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["data/events.js", "data/en.js", "data/detail-events.js", "data/event-media.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx);
}

const events = ctx.window.TIMELINE_EVENTS;
const media = ctx.window.EVENT_MEDIA || {};
const byId = Object.fromEntries(events.map((e) => [e.id, e]));
const EN = (ctx.window.TIMELINE_EN && ctx.window.TIMELINE_EN.events) || {};
const DEN = ctx.window.DETAIL_EVENTS_EN || {};

let fail = 0;
const report = [];

function hayFor(ev) {
  const en = DEN[ev.id] || EN[ev.id] || {};
  return (
    ev.id +
    " " +
    (ev.title || "") +
    " " +
    (ev.summary || "") +
    " " +
    (en.title || "") +
    " " +
    (en.summary || "")
  ).toLowerCase();
}

for (const [eventId, list] of Object.entries(media)) {
  const ev = byId[eventId];
  if (!ev) {
    console.error("ORPHAN media key (no event):", eventId);
    fail++;
    continue;
  }
  const hay = hayFor(ev);
  (list || []).forEach((m, i) => {
    const label = `${eventId}[${i}] ${m.id || m.src}`;
    if (!m.src || !fs.existsSync(path.join(root, m.src))) {
      console.error("MISSING FILE", label, m.src);
      fail++;
    }
    if (!m.anchors || !m.anchors.length) {
      console.error("NO ANCHORS", label);
      fail++;
    } else {
      const bad = m.anchors.filter((a) => !hay.includes(String(a).toLowerCase()));
      if (bad.length) {
        console.error("ANCHOR MISMATCH", label, "missing in event:", bad.join(", "));
        fail++;
      }
    }
    if (!m.caption || !(m.caption.ko || m.caption.en)) {
      console.error("NO CAPTION", label);
      fail++;
    }
    // caption should mention at least one anchor
    const cap = ((m.caption && (m.caption.en || m.caption.ko)) || "").toLowerCase();
    const capHit = (m.anchors || []).some((a) => cap.includes(String(a).toLowerCase()));
    if (!capHit && m.anchors && m.anchors.length) {
      // allow if caption is about the image subject closely
      console.warn("WARN caption lacks anchor words", label);
    }
    report.push({ eventId, src: m.src, year: m.year, ok: true });
  });
}

// Cross-attach test: media for A must not pass filter for random B
function filterFor(ev, list) {
  const hay = hayFor(ev);
  return (list || []).filter((m) => (m.anchors || []).every((a) => hay.includes(String(a).toLowerCase())));
}

let cross = 0;
const personal = events.filter((e) => e.category === "personal");
for (const [eventId, list] of Object.entries(media)) {
  for (const p of personal) {
    if (p.id === eventId) continue;
    const leaked = filterFor(p, list);
    if (leaked.length) {
      console.error("CROSS-LEAK to personal", eventId, "->", p.id, leaked.map((x) => x.id));
      cross++;
      fail++;
    }
  }
}

console.log("media event keys", Object.keys(media).length);
console.log("image rows", report.length);
console.log("cross-leaks", cross);
if (fail) {
  console.error("FAIL", fail);
  process.exit(1);
}
console.log("OK");
report.forEach((r) => console.log(" ", r.year, r.eventId, "←", r.src));
