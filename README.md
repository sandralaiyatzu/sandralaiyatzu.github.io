# Sandra Lai — Portfolio

Product design portfolio. Originally a 1:1 React rebuild of
[sandralai.framer.website](https://sandralai.framer.website/); the layout and
motion still follow that original, while the content and type system have since
been reworked.

Deployed to GitHub Pages at **sandralaiyatzu.com**.

## Stack

- **Vite** + **React 19**
- **React Router** (client-side routing)
- Plain CSS, no framework
- Self-hosted Satoshi and local images — no external requests at runtime

## Pages

| Route          | Page                                        |
| -------------- | ------------------------------------------- |
| `/`            | Work / home                                 |
| `/about`       | About                                       |
| `/ruhachu`     | Ruhachu 嚕哈啾                              |
| `/opt`         | OPT 歐趴糖                                  |
| `/1111`        | 1111 人力銀行                               |
| `/sekaimen`    | Sekaimen 世界門                             |
| `/guardianpie` | Guardian Pie 守護派                         |
| anything else  | 404                                         |

Order, slugs and routes all derive from `PROJECTS` in `src/data/site.js` —
adding a project there adds its card, its route and its "More Work" entry.

Card art is the first image of each case study (`src/data/covers.js`), so a
project's card fills in by itself once its artwork lands.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build      # outputs to dist/ (plus 404.html, .nojekyll, CNAME)
npm run preview    # serve the production build locally
```

## Content

**Home, About, nav and footer copy** live in `src/data/site.js`.

**Case studies** are generated from the Markdown sources in the parent folder
into `src/data/<slug>.json`. Edit the Markdown, then regenerate:

```bash
sh scripts/build-content.sh ..
```

### Case-study Markdown rules

The document has three levels, and nothing else:

| Markdown       | Renders as              | Size |
| -------------- | ----------------------- | ---- |
| `#`            | page title (`.t-display`) | 48px |
| `##`           | section heading (`.t-h4`) | 20px |
| everything else | body copy (`.t-small`)   | 14px |

Plus a few conveniences:

- **Image slots** on their own line:
  - `圖片 3 佔位` pulls in `public/images/<slug>/3.png`
  - `圖片 5, 6 佔位` stacks both images as one tight group
  - `圖片佔位` (no number), or a number with no file behind it, renders a
    placeholder tile
  - `圖片佔位(待補，圖片編號 6, 7)` stays a placeholder — 待補 means pending
  - Aspect ratios are read from each PNG, so nothing is cropped
- The **first paragraph under `#`** is split: line 1 is the byline
  (role / dates), the rest is the lead.
- A line starting **`01 |`** becomes a label for the copy beneath it.
- A **lone `-` bullet** becomes a label too, but only when copy is glued
  directly under it (no blank line). With a blank line after it, it stays a
  normal list entry.
- A label hugs its copy (6px) and is pushed away from the previous group
  (32px), so groups read as groups.
- `（連結至：…）` after a heading turns that heading into a link. The URL may
  be bare (`ruhachu.com`) or include a scheme; external links open in a new tab.
- `---` rules are separators and are dropped.
- Sections headed **`待你確認`** or **`待補`** are editorial notes and are
  never published.

Lists, tables and blockquotes are supported and styled.

Case-study images open full-screen on click (Escape, the close button, or a
click outside dismisses). Placeholder tiles are not clickable.

## Design system

Breakpoints:

- **Layout** — `≥1320` / `1024–1319` / `810–1023` (home uses `768`) / `≤809`
- **Typography** — `≥1200` / `810–1199` / `≤809`

One family throughout (Satoshi) and two line-height steps: **130% for
headings, 150% for text**.

| Class         | Size (desktop / tablet / mobile) | Weight | Line height |
| ------------- | -------------------------------- | ------ | ----------- |
| `.t-hero`     | 98 / 73 / 42                     | 500    | 130%        |
| `.t-display`  | 48 / 40 / 32                     | 500    | 130%        |
| `.t-h3`       | 36 / 32 / 26                     | 500    | 130%        |
| `.t-h4/.t-h5` | 20                               | 700    | 130%        |
| `.t-h6`       | 18                               | 700    | 130%        |
| `.t-body-lg`  | 18 / 18 / 16                     | 400    | 150%        |
| `.t-body`     | 16 / 16 / 14                     | 400    | 150%        |
| `.t-small`    | 14                               | 400    | 150%        |

Colours: `#000`, `#333`, `rgba(0,0,0,.8 / .6 / .4)`, `#fff`.

Radii: 20px for large media, 12px for the compact "More Work" cards.

Motion (`cubic-bezier(0.44, 0, 0.56, 1)`):

- Nav — `translateY(-150px) → 0`, opacity `0.001 → 1`, **1.3s**
- Content blocks — `translateY(64px) → 0`, opacity `0.001 → 1`, **1.0s**
- Links — `color` transition, **0.3s**

`prefers-reduced-motion` disables the entrance animations.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to
`main`. In the repository, set **Settings → Pages → Source** to **GitHub
Actions**.

`public/CNAME` holds the custom domain and is copied into `dist/` by the build.
Point DNS at GitHub:

- Apex domain — `A` records to `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- `www` subdomain — `CNAME` to `<username>.github.io`

`404.html` is a copy of `index.html` so deep links resolve through the SPA
router.
