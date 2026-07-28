// GitHub Pages support:
//  - 404.html is a copy of index.html so deep links (/opt, /about, …) boot the SPA
//  - .nojekyll stops Pages from running Jekyll over the build output
//  - CNAME is copied through when a custom domain is configured
import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');

const cname = join(root, 'CNAME');
if (existsSync(cname)) {
  copyFileSync(cname, join(dist, 'CNAME'));
  console.log('postbuild: CNAME copied');
}

console.log('postbuild: 404.html + .nojekyll written');
