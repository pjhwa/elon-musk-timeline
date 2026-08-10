# Event images (offline)

All timeline card images live here and are referenced only as **local relative paths**
from `data/event-media.js`. The HTML app does **not** load photos from the internet.

## Policy

1. **Offline only** — no `https://` image `src` in the UI.
2. **Event-scoped** — each `EVENT_MEDIA[eventId]` list is shown only for that event.
3. **Captions + credit** — every figure has ko/en caption and a credit/source line.
4. **Anchors** — each image has `anchors[]` that must match the host event id/title (audit).
5. Prefer Wikimedia Commons / public-domain SpaceX & U.S. government files when a free photo exists.

## Verify

```bash
node scripts/audit-event-media.js
```
