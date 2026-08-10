#!/usr/bin/env node
/**
 * Verify EVENT_MEDIA: every event has local-only images; anchors match host event;
 * no remote src; files exist.
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

for (const ev of events) {
  const list = media[ev.id];
  if (!list || !list.length) {
    console.error("NO MEDIA", ev.id);
    fail++;
    continue;
  }
  const hay = hayFor(ev);
  list.forEach((m, i) => {
    const label = `${ev.id}[${i}]`;
    if (!m.src) {
      console.error("NO SRC", label);
      fail++;
      return;
    }
    if (/^https?:\/\//i.test(m.src)) {
      console.error("REMOTE SRC (forbidden)", label, m.src);
      fail++;
    }
    if (!fs.existsSync(path.join(root, m.src))) {
      console.error("MISSING FILE", label, m.src);
      fail++;
    }
    if (!m.anchors || !m.anchors.length) {
      console.error("NO ANCHORS", label);
      fail++;
    } else {
      const bad = m.anchors.filter((a) => !hay.includes(String(a).toLowerCase()));
      if (bad.length) {
        console.error("ANCHOR MISMATCH", label, bad.join(","));
        fail++;
      }
    }
    if (!m.caption || !(m.caption.ko || m.caption.en)) {
      console.error("NO CAPTION", label);
      fail++;
    }
    if (!m.credit) {
      console.error("NO CREDIT", label);
      fail++;
    }
  });
}

// orphan keys
for (const k of Object.keys(media)) {
  if (!byId[k]) {
    console.error("ORPHAN KEY", k);
    fail++;
  }
}

console.log("events", events.length);
console.log("media keys", Object.keys(media).length);
console.log("image rows", Object.values(media).reduce((n, a) => n + a.length, 0));
if (fail) {
  console.error("FAIL", fail);
  process.exit(1);
}
console.log("OK — all local, all events covered");
