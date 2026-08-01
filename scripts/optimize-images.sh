#!/bin/sh
# Convert the source images into web-sized WebP under public/images/.
#
#   sh scripts/optimize-images.sh [source-dir] [slug...]     (default: ../images)
#
# Pass one or more slugs to convert only those folders, e.g.
#   sh scripts/optimize-images.sh ../images ruhachu guardianpie
#
# The work happens in optimize-images.mjs, which uses the sharp package from
# node_modules — no Homebrew or cwebp needed, `npm install` is enough.
set -e

exec node "$(dirname "$0")/optimize-images.mjs" "$@"
