#!/bin/sh
# Regenerate case-study content from the source Markdown.
# Run from the project root:  sh scripts/build-content.sh
set -e
M="${1:-..}"
python3 scripts/md_to_content.py "$M/嚕哈啾-案例重構.md"          src/data/ruhachu.json
python3 scripts/md_to_content.py "$M/OPT-歐趴雞排-案例重構.md"      src/data/opt.json
python3 scripts/md_to_content.py "$M/1111-Recruitment-案例重構.md" src/data/1111.json
python3 scripts/md_to_content.py "$M/Sekaimen-案例重構.md"         src/data/sekaimen.json
python3 scripts/md_to_content.py "$M/GuardianPie-case-study.md"    src/data/guardianpie.json
