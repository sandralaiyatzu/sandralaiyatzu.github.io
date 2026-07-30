import ruhachu from './ruhachu.json';
import opt from './opt.json';
import recruit from './1111.json';
import sekaimen from './sekaimen.json';
import guardianpie from './guardianpie.json';

const DOCS = {
  ruhachu,
  opt,
  1111: recruit,
  sekaimen,
  guardianpie,
};

/**
 * A project's card art is the first image of its case study — so once a
 * case study gets its artwork, the card picks it up with no extra wiring.
 * Returns null while a case study is still on placeholders.
 */
export function coverFor(slug) {
  const blocks = DOCS[slug]?.blocks ?? [];
  for (const block of blocks) {
    const first = block.images?.[0];
    if (first) return first.src;
  }
  return null;
}
