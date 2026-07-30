#!/bin/sh
# Convert the source images into web-sized WebP under public/images/.
#
#   sh scripts/optimize-images.sh [source-dir]     (default: ../images)
#
# Source images live outside the app (../images/<slug>/<n>.png) and stay as
# the untouched originals. This writes public/images/<slug>/<n>.webp, capped
# at 1920px wide — the largest the layout ever renders is 960px, so 1920
# still covers retina.
#
# Needs cwebp:  brew install webp
set -e

SRC="${1:-../images}"
DEST="public/images"
MAX_WIDTH=1920
QUALITY=85

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found — run: brew install webp" >&2
  exit 1
fi

total_before=0
total_after=0

for dir in "$SRC"/*/; do
  slug=$(basename "$dir")
  mkdir -p "$DEST/$slug"

  for src in "$dir"*.png "$dir"*.jpg "$dir"*.jpeg; do
    [ -f "$src" ] || continue
    name=$(basename "$src")
    out="$DEST/$slug/${name%.*}.webp"

    width=$(sips -g pixelWidth "$src" 2>/dev/null | awk '/pixelWidth/{print $2}')
    # Only ever shrink — never upscale a smaller original
    if [ -n "$width" ] && [ "$width" -gt "$MAX_WIDTH" ]; then
      cwebp -q "$QUALITY" -resize "$MAX_WIDTH" 0 -quiet "$src" -o "$out"
    else
      cwebp -q "$QUALITY" -quiet "$src" -o "$out"
    fi

    before=$(stat -f%z "$src")
    after=$(stat -f%z "$out")
    total_before=$((total_before + before))
    total_after=$((total_after + after))
    printf '  %-28s %6s KB → %5s KB\n' "$slug/$name" \
      $((before / 1024)) $((after / 1024))
  done
done

echo
printf 'total  %s MB → %s MB\n' \
  $((total_before / 1048576)) $((total_after / 1048576))
