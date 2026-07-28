# Sandra Lai — Portfolio

A React rebuild of [sandralai.framer.website](https://sandralai.framer.website/),
matching the original's layout, typography, colours, responsive behaviour and
motion.

## Stack

- **Vite** + **React 19**
- **React Router** (client-side routing)
- Plain CSS, no framework — the type scale and spacing mirror the original's
  Framer style presets 1:1
- Self-hosted fonts (Satoshi, Inter) and images — no external requests at runtime

## Pages

| Route           | Page                        |
| --------------- | --------------------------- |
| `/`             | Work / home                 |
| `/about`        | About                       |
| `/opt`          | OPT Course Feedback System  |
| `/1111-recruit` | 1111 Recruitment Platform   |
| `/sekaimen`     | Sekaimen E-commerce Website |
| `/akari`        | Akari AI Security Care App  |
| anything else   | 404                         |

## Development

```bash
npm install
npm run dev
```

```bash
npm run build      # outputs to dist/ (plus 404.html, .nojekyll, CNAME)
npm run preview    # serve the production build locally
```

## Design system

Breakpoints follow the original exactly:

- **Layout** — `≥1320` / `1024–1319` / `810–1023` (home uses `768`) / `≤809`
- **Typography** — `≥1200` / `810–1199` / `≤809`

Type scale (`src/styles/global.css`):

| Class         | Font    | Size (desktop / tablet / mobile) | Weight | Line height        |
| ------------- | ------- | -------------------------------- | ------ | ------------------ |
| `.t-hero`     | Satoshi | 98 / 73 / 42                     | 500    | 120%               |
| `.t-display`  | Satoshi | 50 / 40 / 32                     | 500    | 130%               |
| `.t-h3`       | Satoshi | 36 / 32 / 26                     | 500    | 130%               |
| `.t-h4/.t-h5` | Inter   | 20                               | 700    | 150%               |
| `.t-h6`       | Inter   | 18                               | 700    | 100%               |
| `.t-body-lg`  | Satoshi | 18 / 18 / 16                     | 400    | 150%               |
| `.t-body`     | Satoshi | 16 / 16 / 14                     | 400    | 150% / 140% / 130% |
| `.t-small`    | Inter   | 14                               | 400    | 150%               |

Colours: `#000`, `#333`, `rgba(0,0,0,.8 / .6 / .4)`, `#fff`.

Motion (`cubic-bezier(0.44, 0, 0.56, 1)`):

- Nav — `translateY(-150px) → 0`, opacity `0.001 → 1`, **1.3s**
- Content blocks — `translateY(64px) → 0`, opacity `0.001 → 1`, **1.0s**
- Links — `color` transition, **0.3s**

`prefers-reduced-motion` disables the entrance animations.

## Content

Case-study copy lives in `src/data/*.json` as ordered blocks (`rich` text
sections and `image` blocks), so text can be edited without touching components.
Home, About and nav/footer copy is in `src/data/site.js`.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to
`main`. In the repository, set **Settings → Pages → Source** to **GitHub
Actions**.

For a custom domain, add a `CNAME` file at the project root containing the bare
domain (e.g. `sandralai.com`); the build copies it into `dist/`. Then point DNS
at GitHub:

- Apex domain — `A` records to `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- `www` subdomain — `CNAME` to `<username>.github.io`

`404.html` is a copy of `index.html` so deep links resolve through the SPA
router.
