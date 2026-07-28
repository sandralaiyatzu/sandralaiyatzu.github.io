import { Navigate } from 'react-router-dom';
import RichBlock from '../components/RichBlock';
import MoreWork from '../components/MoreWork';
import usePageTitle from '../hooks/usePageTitle';
import { CASE_META } from '../data/site';

import opt from '../data/opt.json';
import recruit from '../data/1111-recruit.json';
import sekaimen from '../data/sekaimen.json';

const CONTENT = {
  opt,
  '1111-recruit': recruit,
  sekaimen,
};

export default function CaseStudy({ slug }) {
  const blocks = CONTENT[slug];
  const meta = CASE_META[slug];

  usePageTitle(meta ? `${meta.title} — Sandra Lai` : 'Sandra Lai');

  if (!blocks) return <Navigate to="/404" replace />;

  return (
    <>
      <main className="cs">
        <div className="cs__col appear-up">
          {blocks.map((block, i) =>
            block.type === 'image' ? (
              <figure
                className="cs__figure"
                key={i}
                style={{ aspectRatio: String(block.ratio) }}
              >
                <img src={block.src} alt={block.alt || ''} loading="lazy" />
              </figure>
            ) : (
              <RichBlock key={i} items={block.items} />
            )
          )}
        </div>
      </main>

      <MoreWork currentSlug={slug} />
    </>
  );
}
