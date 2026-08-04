#!/usr/bin/env bash
# Export one-page poster to PDF + PNG via Google Chrome headless.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/export"
CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-8765}"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME"
  echo "Set CHROME_PATH to your Chrome/Chromium binary."
  exit 1
fi

mkdir -p "$OUT"

# Start a static server so fonts/CSS resolve reliably
python3 -m http.server "$PORT" --directory "$ROOT" >/tmp/musk-timeline-http.log 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT
sleep 0.6

BASE="http://127.0.0.1:${PORT}/poster.html?export=1"

export_lang() {
  local lang="$1"
  local url="${BASE}&lang=${lang}"
  local pdf="$OUT/elon-musk-poster-${lang}.pdf"
  local png="$OUT/elon-musk-poster-${lang}.png"

  echo "→ PDF (${lang}) $pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$pdf" \
    "$url" 2>/dev/null || \
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$pdf" \
    "$url"

  echo "→ PNG (${lang}) $png"
  # Capture the poster frame at design size
  "$CHROME" --headless=new --disable-gpu \
    --window-size=1640,1200 \
    --screenshot="$png" \
    "$url" 2>/dev/null || \
  "$CHROME" --headless --disable-gpu \
    --window-size=1640,1200 \
    --screenshot="$png" \
    "$url"
}

export_lang en
export_lang ko

echo ""
echo "Done. Files in: $OUT"
ls -la "$OUT"
