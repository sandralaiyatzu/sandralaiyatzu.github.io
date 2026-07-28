import { Navigate, Link } from 'react-router-dom';
import RichBlock from '../components/RichBlock';
import usePageTitle from '../hooks/usePageTitle';
import { CASE_META, PROJECTS } from '../data/site';

import opt from '../data/opt.json';
import recruit from '../data/1111-recruit.json';
import sekaimen from '../data/sekaimen.json';
import akari from '../data/akari.json';

const CONTENT = {
  opt,
  '1111-recruit': recruit,
  sekaimen,
  akari,
};

export default function CaseStudy({ slug }) {
  const blocks = CONTENT[slug];
  const meta = CASE_META[slug];

  usePageTitle(meta ? `${meta.title} — Sandra Lai` : 'Sandra Lai');

  if (!blocks) return <Navigate to="/404" replace />;

  // "See Next" cycles through the projects in the same order as the work list
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

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

      <div className="see-next">
        <Link className="btn btn--hug" to={`/${next.slug}`}>
          <span className="t-body-lg">See Next</span>
        </Link>
      </div>
    </>
  );
}
