// Convert the source images into web-sized WebP under public/images/.
//
//   node scripts/optimize-images.mjs [source-dir] [slug...]
//
// Source images live outside the app (../images/<slug>/<n>.png) and stay as
// the untouched originals. This writes public/images/<slug>/<n>.webp, capped
// at 1920px wide — the largest the layout ever renders is 960px, so 1920
// still covers retina.
//
// Pass one or more slugs to convert only those folders; without them every
// folder under the source directory is rebuilt.
//
// A source whose .webp is already newer than it is left alone, so adding one
// image to a folder re-encodes that one image rather than every sibling —
// re-encoding is lossy, and it would churn the whole folder in git. Pass
// --force to rebuild regardless.
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const argv = process.argv.slice(2)
const force = argv.includes('--force')
const [srcArg, ...slugs] = argv.filter((arg) => arg !== '--force')
const SRC = srcArg ?? '../images'
const DEST = 'public/images'
const MAX_WIDTH = 1920
const QUALITY = 85

const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

const dirs = (await readdir(SRC, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((slug) => slugs.length === 0 || slugs.includes(slug))
  .sort()

if (slugs.length > 0) {
  const missing = slugs.filter((slug) => !dirs.includes(slug))
  if (missing.length > 0) {
    console.error(`no such folder under ${SRC}: ${missing.join(', ')}`)
    process.exit(1)
  }
}

let totalBefore = 0
let totalAfter = 0
let skipped = 0

for (const slug of dirs) {
  await mkdir(path.join(DEST, slug), { recursive: true })

  const files = (await readdir(path.join(SRC, slug)))
    .filter((name) => SOURCE_EXT.has(path.extname(name).toLowerCase()))
    // 2.png before 10.png — the case studies reference images by number
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const name of files) {
    const src = path.join(SRC, slug, name)
    const out = path.join(DEST, slug, `${path.parse(name).name}.webp`)

    const srcStat = await stat(src)
    if (!force) {
      const outStat = await stat(out).catch(() => null)
      if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
        skipped += 1
        continue
      }
    }

    // Only ever shrink — never upscale a smaller original
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out)

    const before = srcStat.size
    const after = (await stat(out)).size
    totalBefore += before
    totalAfter += after
    const label = `${slug}/${name}`.padEnd(28)
    const kb = (bytes) => String(Math.round(bytes / 1024))
    console.log(`  ${label} ${kb(before).padStart(6)} KB → ${kb(after).padStart(5)} KB`)
  }
}

const mb = (bytes) => (bytes / 1048576).toFixed(1)
const note = skipped > 0 ? `   (${skipped} already up to date)` : ''
console.log(`\ntotal  ${mb(totalBefore)} MB → ${mb(totalAfter)} MB${note}`)
