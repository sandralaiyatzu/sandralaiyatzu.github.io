#!/bin/sh
# Regenerate case-study content from the source Markdown.
# Run from the project root:  sh scripts/build-content.sh [markdown-dir]
#
# The Markdown in content/ is the source of truth for every case study —
# edit it and re-run this, never hand-edit the JSON.
#
# Images are read from public/images/<slug>/<n>.png — the numbers in
# "圖片 5, 6 佔位" map straight onto those filenames. A number with no file
# behind it falls back to a placeholder tile.
set -e
M="${1:-content}"
IMG="public/images"
run() { python3 scripts/md_to_content.py "$1" "$2" "$IMG"; }

run "$M/嚕哈啾-案例重構.md"          src/data/ruhachu.json
run "$M/OPT-歐趴雞排-案例重構.md"      src/data/opt.json
run "$M/1111-Recruitment-案例重構.md" src/data/1111.json
run "$M/Sekaimen-案例重構.md"         src/data/sekaimen.json
run "$M/GuardianPie-case-study.md"    src/data/guardianpie.json
