// Pure helpers for build_prompt. No filesystem, no network.
// Grok Imagine (grok.com/imagine) wants natural-language prose and UI aspect/quality.
// It ignores Midjourney flags (--ar, --style, --iw) and image-URL prompts.

export const STYLE_KEYS = [
  "editorial-caricature",
  "flat-vector",
  "ink-sketch",
  "woodcut",
  "pixel-art",
  "low-poly",
  "comic-panel",
];

export const ASPECTS = ["16:9", "4:5", "1:1", "3:2", "2:3", "9:16"];

/** Ratios Grok Imagine exposes in the UI. 4:5 is a Midjourney default and is mapped. */
export const GROK_ASPECTS = ["2:3", "3:2", "1:1", "16:9", "9:16"];

export const BLOCKED = /\b(nude|naked|nsfw|sexual|porn|gore|blood|corpse|child|children|kid|minor|swastika|nazi)\b/i;

/** Midjourney style tokens. No "newspaper": that cue makes image models invent mastheads. */
export const STYLES = {
  "editorial-caricature": "editorial caricature illustration, exaggerated proportions, bold expressive ink lines, flat watercolour wash, visibly hand-drawn",
  "flat-vector": "flat vector illustration, simple geometric shapes, limited bold palette, clean outlines",
  "ink-sketch": "loose ink and pen sketch on cream paper, cross-hatching, sketchbook feel, visible pencil construction lines",
  "woodcut": "linocut woodcut print, chunky carved lines, two-colour ink on paper, vintage print composition",
  "pixel-art": "16-bit pixel art, chunky pixels, limited palette, retro video game scene",
  "low-poly": "low-poly 3D illustration, faceted shapes, flat shading, obviously stylised toy-like figure",
  "comic-panel": "comic book panel, halftone dots, thick outlines, speech-bubble-free composition",
};

const GROK_LOOK = {
  "editorial-caricature": {
    style: "a friendly editorial caricature, visibly hand-drawn, with a flat watercolour wash on textured paper",
    line: "a bold varied ink line, with a thick outer contour and thinner lines for the eyes and the mouth",
    palette: "warm ivory paper, lampblack ink, muted amber, and one cool teal accent",
    lighting: "flat illustrated light, with a warm key from the upper left and simple shadow shapes, and no photographic skin",
  },
  "flat-vector": {
    style: "a flat vector illustration of simple geometric shapes and clean even outlines",
    line: "a uniform medium-weight outline, with no sketchy texture",
    palette: "four flat bold colours plus black and off-white",
    lighting: "flat colour only, with no gradients and no realistic light",
  },
  "ink-sketch": {
    style: "a loose ink and pen sketch on cream paper, with a sketchbook feel",
    line: "visible pencil construction lines under confident pen strokes, and cross-hatching for shade",
    palette: "graphite gray, black ink, and the cream of the paper",
    lighting: "shade described only by hatch density, not by photographic light",
  },
  woodcut: {
    style: "a linocut woodcut print with chunky carved lines and two-colour ink on paper",
    line: "thick gouged lines and rough printed edges, with no fine detail",
    palette: "warm paper, dense black, and one rust-red ink",
    lighting: "high-contrast print lighting, with no soft photographic shadows",
  },
  "pixel-art": {
    style: "a 16-bit pixel-art scene of chunky pixels",
    line: "stepped pixel edges, with no anti-aliasing and no smooth vectors",
    palette: "a limited retro palette of sixteen colours",
    lighting: "simple pixel dither for light, not realistic shading",
  },
  "low-poly": {
    style: "a low-poly illustration of faceted shapes, obviously a stylised toy-like figure",
    line: "hard polygon edges and flat shading on each facet",
    palette: "cool gray facets with one saturated accent colour",
    lighting: "one flat key colour on the facets, with no realistic materials",
  },
  "comic-panel": {
    style: "a single comic-book panel with halftone dots and thick outlines",
    line: "heavy contour ink and halftone shading",
    palette: "muted primary comic colours on a paper ground",
    lighting: "graphic shadow shapes, not a photographed face",
  },
};

const PROP_HINTS = [
  { re: /starlink|satellite/i, prop: "a loose arc of unmarked satellites linked by ribbons of light" },
  { re: /grok|\bxai\b|inference|reinforcement|\brl\b/i, prop: "a knot of glowing ribbons standing in for a training run, with no letters inside it" },
  { re: /\brocket|\bfalcon\b|booster|liftoff/i, prop: "one plain rocket with no markings" },
  { re: /tesla|cybertruck|robotaxi|electric vehicle/i, prop: "one simplified electric car with no badges" },
  { re: /\bmars\b|martian/i, prop: "a small red planet" },
  { re: /neuralink|brain implant/i, prop: "a small smooth headset with no markings" },
  { re: /\bcode\b|software|c\+\+|rewrite/i, prop: "abstract blocks of light standing in for software" },
];

function propFor(text) {
  const found = [];
  for (const hint of PROP_HINTS) {
    if (hint.re.test(text) && !found.includes(hint.prop)) found.push(hint.prop);
    if (found.length === 2) break;
  }
  return found.length ? found.join(", plus ") : "one oversized unmarked object that stands for the action";
}

const REPLACEMENT = /\b(rewr(?:ote|ite|iting|itten)|from scratch|replac\w*|throw(?:n|ing)? out|discard\w*|legacy|overhaul|migrat\w*)\b/i;
const BEAM = "a single bold beam of teal light";
const BEAM_SENTENCE = "The beam is one continuous thick cable of light that sweeps in a smooth diagonal from the upper left down toward the centre.";
const CRATES = "a small tidy pile of old discarded plain wooden crates with a few loose gears, showing the old tools being thrown out; the crates are completely blank";
const AI_CORE = "the large glowing AI core, a smooth sphere of warm amber light with neat concentric rings, clearly being powered by the beam, with a soft glow around it";
const PLUG_ACTION = "confidently catching the light cable in one hand and plugging it into the side of a big glowing spherical AI core, the way an engineer connects a cable";

function hasWord(text, re) {
  return re.test(text);
}

function baseMetaphor(text) {
  const hasStarlink = hasWord(text, /starlink|satellite/i);
  const hasAI = hasWord(text, /grok|\bxai\b|inference|reinforcement|\brl\b|\bai\b|artificial intelligence/i);
  const hasStarship = hasWord(text, /starship/i);
  const hasRocket = hasWord(text, /\brocket|\bfalcon\b|\bbooster\b|liftoff/i);
  const hasRobotaxi = hasWord(text, /robotaxi/i);
  const hasTesla = hasWord(text, /tesla|cybertruck|electric vehicle/i);
  const hasOptimus = hasWord(text, /optimus|humanoid robot/i);
  const hasX = hasWord(text, /\btwitter\b|x app|the x platform/i);
  const hasMars = hasWord(text, /\bmars\b/i);
  const hasCode = hasWord(text, /\bcode\b|software|c\+\+|\bstack\b/i);

  let metaphor;
  if (hasStarlink && hasAI) {
    metaphor = {
      preset: "starlink-ai",
      source: "one large, clearly drawn Starlink-style flat-panel satellite in orbit above the curve of the Earth",
      link: BEAM,
      linkSentence: BEAM_SENTENCE,
      action: PLUG_ACTION,
      result: AI_CORE,
      eye: "satellite, beam, Elon's face, AI core",
    };
  } else if (hasStarlink) {
    metaphor = {
      preset: "starlink",
      source: "one large, clearly drawn Starlink-style flat-panel satellite in orbit above the curve of the Earth",
      link: BEAM,
      linkSentence: BEAM_SENTENCE,
      action: "confidently catching the light cable in one hand and aiming it down toward the ground",
      result: "one small plain ground dish with no markings, clearly receiving the beam, with a soft glow around it",
      eye: "satellite, beam, Elon's face, the dish",
    };
  } else if (hasStarship || hasRocket) {
    metaphor = {
      preset: "rocket",
      source: hasStarship
        ? "one large Starship-style rocket with no markings"
        : "one large plain rocket with no markings",
      link: "a single bold plume of warm light",
      linkSentence: "The plume is one continuous thick trail that sweeps in a smooth diagonal from the upper left down toward the centre.",
      action: "confidently catching that trail in one hand and steering it onward",
      result: hasMars
        ? "a small red planet, clearly receiving the trail, with a soft glow around it"
        : "a plain open arc of sky where the trail arrives, with no markings",
      eye: "the rocket, the plume, Elon's face, the destination",
    };
  } else if (hasRobotaxi || hasTesla) {
    metaphor = {
      preset: hasRobotaxi ? "robotaxi" : "tesla",
      source: "a plain unmarked garage bay",
      link: "a single bold path of teal light",
      linkSentence: "The path is one continuous thick ribbon of light that sweeps in a smooth diagonal from the upper left down toward the centre.",
      action: "guiding the ribbon outward with one hand",
      result: hasRobotaxi
        ? "one simplified robotaxi with no badges and no text, with a soft glow around it"
        : "one simplified electric car with no badges and no text, with a soft glow around it",
      eye: "the garage, the path, Elon's face, the car",
    };
  } else if (hasOptimus) {
    metaphor = {
      preset: "optimus",
      source: "a plain workbench with no labels",
      link: BEAM,
      linkSentence: BEAM_SENTENCE,
      action: "catching the light cable in one hand and offering it forward",
      result: "one humanoid robot with a smooth blank face and no logos, taking a single step",
      eye: "the bench, the beam, Elon's face, the robot",
    };
  } else if (hasAI) {
    metaphor = {
      preset: "ai",
      source: "one plain unmarked block standing in for a server",
      link: BEAM,
      linkSentence: BEAM_SENTENCE,
      action: PLUG_ACTION,
      result: AI_CORE,
      eye: "the server, the beam, Elon's face, AI core",
    };
  } else if (hasX) {
    metaphor = {
      preset: "x-app",
      source: "a small plain dark rounded rectangle with a blank face, standing in for a phone",
      link: "a single bold stream of light, not letters",
      linkSentence: "The stream is one continuous thick cable of light that sweeps in a smooth diagonal from the upper left down toward the centre.",
      action: "catching the cable in one hand and sending it onward",
      result: "a larger plain dark rectangle, also completely blank, with a soft glow around it",
      eye: "the phone, the stream, Elon's face, the larger screen",
    };
  } else {
    metaphor = {
      preset: "generic",
      source: "one large unmarked object that stands for the cause",
      link: BEAM,
      linkSentence: BEAM_SENTENCE,
      action: "confidently catching the light cable in one hand and connecting it to the object on the right",
      result: "one large unmarked object that stands for the outcome, with a soft glow around it",
      eye: "the source, the beam, Elon's face, the result",
    };
  }

  if (REPLACEMENT.test(text)) {
    metaphor.discarded = hasCode || metaphor.preset === "starlink-ai" || metaphor.preset === "ai"
      ? CRATES
      : "a small tidy pile of blank discarded objects from the old way";
  } else {
    metaphor.discarded = null;
  }
  return metaphor;
}

/**
 * Left-to-right magazine-cover metaphor.
 * Overrides replace the derived part. `discarded: null` is ignored; pass a string to set the pile.
 * An empty discarded string suppresses the pile.
 */
export function deriveMetaphor(text, overrides = {}) {
  const metaphor = baseMetaphor(text || "");
  const custom = ["source", "link", "action", "result"].some((key) => overrides[key]);
  if (overrides.source) metaphor.source = overrides.source;
  if (overrides.link) {
    metaphor.link = overrides.link;
    metaphor.linkSentence = "That connection is one continuous bold element that sweeps in a smooth diagonal from the upper left down toward the centre.";
  }
  if (overrides.action) metaphor.action = overrides.action;
  if (overrides.result) metaphor.result = overrides.result;
  if (overrides.discarded != null && String(overrides.discarded).trim() === "") metaphor.discarded = null;
  else if (overrides.discarded) metaphor.discarded = String(overrides.discarded).trim();
  if (custom) metaphor.eye = "the source, the beam, Elon's face, the result";
  metaphor.preset = custom ? "custom" : metaphor.preset;
  return {
    preset: metaphor.preset,
    source: metaphor.source,
    link: metaphor.link,
    linkSentence: metaphor.linkSentence,
    action: metaphor.action,
    result: metaphor.result,
    discarded: metaphor.discarded || null,
    eye: metaphor.eye,
  };
}

const FRAME_WORD = {
  "16:9": "wide",
  "9:16": "tall",
  "1:1": "square",
  "3:2": "landscape",
  "2:3": "upright",
  "4:5": "upright",
};

const ASPECT_RATIO = {
  "1:1": 1,
  "4:5": 0.8,
  "2:3": 2 / 3,
  "3:2": 1.5,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
};

const ERA_LOOK = {
  "2020s": {
    look: "short dark-brown hair swept back with receding temples, a strong square jaw, a broad face, and a slight smirk",
    clothes: "a plain black t-shirt or a black suit jacket",
  },
  "late 2010s": {
    look: "dark-brown hair combed back with receding temples, a strong square jaw, short stubble, and a slight smirk",
    clothes: "a dark suit jacket over a simple shirt",
  },
  "early 2010s": {
    look: "short dark-brown hair with a fuller hairline than in later years, an oval face with a jaw just starting to square, light stubble, and a small closed-mouth smile",
    clothes: "a dark blazer",
  },
  "early 2000s": {
    look: "dark-brown hair with a lower, fuller hairline, a jaw less square than in later years, light stubble, and a small smile",
    clothes: "a dark suit jacket or an open-collar shirt",
  },
  "late 1990s": {
    look: "dark-brown hair with a low full hairline, a less square jaw, and a light smile",
    clothes: "a simple dark jacket or a casual collared shirt",
  },
};

const HANGUL = /[가-힣]/;

function clause(s) {
  return String(s).trim().replace(/[.。\s]+$/u, "");
}

function quote(s) {
  return `"${String(s).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

export function refYear(item) {
  if (item && Number.isInteger(item.year)) return item.year;
  const m = String(item?.title || "").match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

function portraitScore(title) {
  const t = String(title || "");
  let score = 0;
  if (/^elon musk\b/i.test(t)) score += 3;
  else if (/elon musk/i.test(t)) score += 1;
  if (/\b(trump|obama|protest|dealership)\b/i.test(t)) score -= 2;
  return score;
}

function compareKey(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  }
  return 0;
}

/** Nearest dated manifest row. Year field wins over a year parsed from the title; portrait-like titles win ties. */
export function closestReference(items, year) {
  if (year == null || !items?.length) return null;
  let best = null;
  let bestKey = null;
  items.forEach((item, index) => {
    const y = refYear(item);
    if (y == null) return;
    const key = [Math.abs(y - year), Number.isInteger(item.year) ? 0 : 1, -portraitScore(item.title), index];
    if (!best || compareKey(key, bestKey) < 0) {
      best = item;
      bestKey = key;
    }
  });
  return best;
}

export function eraForYear(year) {
  const y = Number.isInteger(year) ? year : new Date().getUTCFullYear();
  if (y >= 2020) return "2020s";
  if (y >= 2016) return "late 2010s";
  if (y >= 2010) return "early 2010s";
  if (y >= 2002) return "early 2000s";
  return "late 1990s";
}

/** Neutral, era-specific caricature description. Exaggerates jaw, grin, and hairline without appearance-shaming. */
export function likenessForYear(year) {
  const y = Number.isInteger(year) ? year : new Date().getUTCFullYear();
  const era = eraForYear(y);
  const { look, clothes } = ERA_LOOK[era];
  const text = [
    `Caricature of Elon Musk as he appeared circa ${y}, in his ${era} look: ${look}, often wearing ${clothes}.`,
    "Clothing has no lettering.",
    "He should be recognisable as Elon Musk at a glance.",
    "Exaggerate the jaw, the grin, and the hairline a little, in a friendly editorial way.",
    "Do not mock his body or his appearance.",
    "Skin is flat illustrated colour, not photographic detail.",
  ].join(" ");
  return { year: y, era, text };
}

export function resolveAspect(target, aspect) {
  if (target === "midjourney") {
    const chosen = aspect ?? "4:5";
    return { aspect: chosen, requested: chosen, mapped: false };
  }
  const requested = aspect ?? "2:3";
  if (GROK_ASPECTS.includes(requested)) return { aspect: requested, requested, mapped: false };
  const value = ASPECT_RATIO[requested];
  let best = GROK_ASPECTS[0];
  let bestDistance = Infinity;
  for (const candidate of GROK_ASPECTS) {
    const distance = Math.abs(ASPECT_RATIO[candidate] - value);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return { aspect: best, requested, mapped: true };
}

export function koreanCaptionSuggestion({ headline, caption, labels } = {}) {
  const parts = [headline, caption, ...(labels || [])].map((s) => (s == null ? "" : String(s).trim())).filter(Boolean);
  return parts.length ? parts.join("\n") : null;
}

function textParagraph({ headline, caption, labels }) {
  const entries = [];
  if (headline) entries.push({ text: headline, place: "in a clean top banner, in large type" });
  if (caption) entries.push({ text: caption, place: "inside one speech bubble beside the figure" });
  for (const label of labels || []) entries.push({ text: label, place: "on its own small sign" });

  if (!entries.length) {
    return [
      "Keep every surface wordless: no text, no letters, no numerals, no logos, no captions.",
      "No English words, no newspaper masthead, no signage.",
      "No banners, no nameplates, no labels, no watermarks, and no writing of any kind.",
      "Do not letter any word from this description.",
    ].join(" ");
  }

  const placed = entries.map((entry) => `Render ${quote(entry.text)} ${entry.place}.`).join(" ");
  const only = entries.map((entry) => quote(entry.text)).join(", ");
  return [
    placed,
    "Use bold, clean Hangul sans-serif lettering.",
    "Spell it exactly, character for character, including any Latin letters or punctuation already inside the quotes, with correct spacing.",
    "Do not translate, romanize, restyle, or correct the spelling.",
    `The only writing allowed is ${only}.`,
    "Nothing else written.",
    "No English words beyond the quoted string, no newspaper masthead, no extra signage.",
  ].join(" ");
}

function sceneParagraph({ scene, topic, grounding, hasText, hasHeadline, frameWord }) {
  const lead = [];
  if (scene) lead.push(clause(scene));
  if (topic) lead.push(`Turn this news into one clear visual metaphor, acted out with objects rather than words: ${clause(topic)}`);
  if (grounding) lead.push(`Respect the real public event ${quote(grounding.title)} (${grounding.date}), and do not invent a different incident`);
  if (!lead.length) lead.push("A single calm pose with one prop from his public work");

  const midground = scene
    ? "the action described above, kept to one clear gesture"
    : propFor([topic, grounding?.title].filter(Boolean).join(" "));
  const background = !hasText
    ? "Background: a plain interior or open sky, quieter than the figure, with blank surfaces only."
    : hasHeadline
      ? "Background: simpler shapes, with a clear empty band across the top where the only writing will sit."
      : "Background: simpler shapes, quieter than the figure.";
  const layers = `Composition uses three depth layers on a ${frameWord} frame. Foreground: the caricature, waist-up, large in the frame. Midground: ${midground}, just behind him. ${background} Camera angle: a slight low angle, three-quarter view, medium shot. Focal point: the face.`;

  return `${lead.join(". ")}. ${layers} Show software, data, and source code only as abstract ribbons, blocks, and arcs of light, never as readable characters. No letters or symbols inside any object, including the AI core.`;
}

function flowParagraph({ metaphor, frameWord, aspect, hasHeadline, grounding }) {
  const parts = [];
  if (grounding) {
    parts.push(`Respect the real public event ${quote(grounding.title)} (${grounding.date}), and do not invent a different incident.`);
  }
  parts.push(`One clear story told in a single left-to-right flow, like a well-designed magazine cover. Tight, balanced composition on a ${frameWord} ${aspect} frame, rule of thirds, few elements, every element connected, generous empty space, no clutter, no crowd, no extra people.`);
  parts.push(`Left third, upper area: ${metaphor.source}, emitting ${metaphor.link}. ${metaphor.linkSentence}`);
  parts.push(`Centre third: the caricature of Elon Musk, waist-up, three-quarter view, slight low angle, ${metaphor.action}. His face is the focal point and the sharpest detail in the picture.`);
  let right = `Right third: ${clause(metaphor.result)}.`;
  if (metaphor.discarded) {
    const pile = clause(metaphor.discarded);
    const blank = /blank/i.test(pile) ? "" : " Those objects are completely blank.";
    right += ` At his feet in the lower right, ${pile}.${blank}`;
  }
  parts.push(right);
  const top = hasHeadline
    ? "Top band: a clean empty strip of ivory paper across the full width, reserved only for the headline."
    : "Top band: a clean empty strip of ivory paper across the full width, left empty.";
  parts.push(`${top} The eye should travel ${metaphor.eye}. Show software and data only as light, never as readable characters. No letters or symbols inside any object, including the AI core.`);
  return parts.join("\n\n");
}

function negativeList({ hasText, caption, labels }) {
  const always = [
    "photorealistic",
    "photograph",
    "realistic skin",
    "uncanny portrait",
    "appearance-shaming",
    "gore",
    "readable source code",
    "letters or symbols inside objects",
    "watermark",
    "logo",
  ];
  if (!hasText) {
    return [
      ...always,
      "text",
      "letters",
      "numerals",
      "captions",
      "english words",
      "korean text",
      "newspaper masthead",
      "signage",
      "banners",
      "nameplates",
      "labels",
      "speech bubbles",
    ];
  }
  const list = [
    ...always,
    "extra text",
    "misspelled hangul",
    "english words beyond the quoted string",
    "latin letters beyond the quoted string",
    "newspaper masthead",
    "extra signage",
    "translated caption",
  ];
  if (!caption) list.push("speech bubbles");
  if (!labels?.length) list.push("extra signs");
  return list;
}

function checklist({ target, hasText, hasReference, hasGrounding, hasHangulText }) {
  const items = [
    "Result must read as drawn or rendered, never as a photograph. Re-roll if it looks photoreal.",
    "The caricature should be recognisable as Elon Musk (jaw, grin, hairline) and still obviously an illustration.",
    "Satire of public conduct is fine. Keep it out of private life, family, and appearance-shaming.",
    "If you publish it, label it as an illustration, and as AI-made where the platform asks.",
  ];
  if (hasGrounding) items.push("Show the grounded event as it happened. Do not invent a different scene and present it as fact.");
  else items.push("Do not present a fictional scene as a real event.");
  if (target === "grok-imagine") {
    items.push("Set aspect and quality in the Grok Imagine UI from the ui field. Imagine ignores --ar, --style, --iw, and image URLs.");
    if (hasText) {
      items.push("The only writing is the quoted Korean, in bold clean Hangul, spelled exactly. If the Hangul is wrong or any extra English appears, overlay korean_caption_suggestion in your own layout instead of keeping the render.");
      if (!hasHangulText) items.push("The supplied text has no Hangul. Prefer a Korean headline, caption, or label if the lettering should be Hangul.");
    } else {
      items.push("The picture must contain no writing: no English words, no newspaper masthead, no signage. If any letters appear, re-roll.");
      items.push("Do not add a newspaper, placards, or labeled screens. Those cues make the model invent mastheads and slogans. If you want type, set headline, caption, or labels, or overlay your own caption in code.");
    }
    if (hasReference) items.push("The reference photo only picked the era of the likeness. Do not paste its URL into Grok Imagine.");
  } else if (hasText) {
    items.push("If the Korean lettering is wrong, overlay korean_caption_suggestion in code.");
  } else {
    items.push("Do not add made-up quotes or captions. If type is needed, draw it in code on top.");
  }
  if (target === "midjourney" && hasReference) {
    items.push("The photo is only a likeness reference (--iw 0.7 keeps the style prompt in charge). If the output turns photographic, lower --iw or re-roll.");
  }
  return items;
}

/**
 * @returns prompt payload without server-side reference metadata, grounding, or event notes.
 */
export function buildIllustrationPrompt({
  target = "grok-imagine",
  scene,
  topic,
  style = "editorial-caricature",
  aspect,
  grounding = null,
  likenessYear,
  referenceUrl = null,
  hasReference = false,
  headline,
  caption,
  labels = [],
  layout = "flow",
  source,
  link,
  action,
  result,
  discarded,
} = {}) {
  const resolvedTarget = target === "midjourney" ? "midjourney" : "grok-imagine";
  const resolvedStyle = GROK_LOOK[style] ? style : "editorial-caricature";
  const resolvedAspect = resolveAspect(resolvedTarget, aspect);
  const likeness = likenessForYear(likenessYear);
  const cleanLabels = (labels || []).map((s) => String(s).trim()).filter(Boolean);
  const cleanHeadline = headline?.trim() || "";
  const cleanCaption = caption?.trim() || "";
  const hasText = Boolean(cleanHeadline || cleanCaption || cleanLabels.length);
  const frameWord = FRAME_WORD[resolvedAspect.aspect] || "chosen";
  const look = GROK_LOOK[resolvedStyle];
  const resolvedLayout = resolvedTarget === "grok-imagine" && layout === "layers" ? "layers" : "flow";
  const metaphor = deriveMetaphor([topic, scene, grounding?.title].filter(Boolean).join(" "), {
    source, link, action, result, discarded,
  });
  const sceneText = resolvedLayout === "layers"
    ? sceneParagraph({
      scene,
      topic,
      grounding,
      hasText,
      hasHeadline: Boolean(cleanHeadline),
      frameWord,
    })
    : flowParagraph({
      metaphor,
      frameWord,
      aspect: resolvedAspect.aspect,
      hasHeadline: Boolean(cleanHeadline),
      grounding,
    });
  const lettering = textParagraph({
    headline: cleanHeadline,
    caption: cleanCaption,
    labels: cleanLabels,
  });

  let prompt;
  if (resolvedTarget === "grok-imagine") {
    prompt = [
      "A satirical caricature of Elon Musk, drawn as an obvious cartoon figure. Clearly an illustration, not a photograph, not photorealistic. Friendly satire of public work. He is the only person in the picture.",
      likeness.text,
      sceneText,
      `The style is ${look.style}. The line quality is ${look.line}.`,
      `The lighting is ${look.lighting}. The palette is ${look.palette}.`,
      lettering,
    ].join("\n\n");
  } else {
    const textBit = hasText
      ? lettering
      : "no text, no letters, no logos, no captions, no English words, no newspaper masthead, no signage";
    const body = [
      "a satirical caricature of Elon Musk, drawn as an obvious cartoon figure, the only person in the picture",
      likeness.text,
      scene ? clause(scene) : null,
      topic ? `illustrating the news: ${clause(topic)}` : null,
      grounding ? `referencing the real event: ${grounding.title} (${grounding.date})` : null,
      STYLES[resolvedStyle],
      "clearly an illustration, not a photograph, not photorealistic",
      textBit,
    ].filter(Boolean).join(", ");
    const flags = ` --ar ${resolvedAspect.aspect} --style raw${referenceUrl ? " --iw 0.7" : ""}`;
    prompt = `${referenceUrl ? `${referenceUrl} ` : ""}${body}${flags}`;
  }

  const ui = { aspect: resolvedAspect.aspect };
  if (resolvedTarget === "grok-imagine") ui.quality = "highest";
  if (resolvedAspect.mapped) {
    ui.aspect_note = `Grok Imagine has no ${resolvedAspect.requested}. Use ${resolvedAspect.aspect}.`;
  }

  const supplied = [cleanHeadline, cleanCaption, ...cleanLabels].filter(Boolean);
  return {
    target: resolvedTarget,
    prompt,
    negative: negativeList({ hasText, caption: cleanCaption, labels: cleanLabels }),
    ui,
    korean_text: {
      headline: cleanHeadline || null,
      caption: cleanCaption || null,
      labels: cleanLabels,
    },
    korean_caption_suggestion: koreanCaptionSuggestion({
      headline: cleanHeadline,
      caption: cleanCaption,
      labels: cleanLabels,
    }),
    parameters: {
      aspect: resolvedAspect.aspect,
      requested_aspect: resolvedAspect.requested,
      style: resolvedStyle,
      target: resolvedTarget,
      layout: resolvedTarget === "grok-imagine" ? resolvedLayout : undefined,
    },
    metaphor: resolvedTarget === "grok-imagine" && resolvedLayout === "flow" ? {
      source: metaphor.source,
      link: metaphor.link,
      action: metaphor.action,
      result: metaphor.result,
      discarded: metaphor.discarded,
    } : undefined,
    likeness,
    checklist: checklist({
      target: resolvedTarget,
      hasText,
      hasReference,
      hasGrounding: Boolean(grounding),
      hasHangulText: supplied.some((s) => HANGUL.test(s)),
    }),
  };
}
