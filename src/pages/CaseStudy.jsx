import { Navigate } from 'react-router-dom';
import RichBlock from '../components/RichBlock';
import MoreWork from '../components/MoreWork';
import usePageTitle from '../hooks/usePageTitle';
import { PROJECTS } from '../data/site';

import ruhachu from '../data/ruhachu.json';
import opt from '../data/opt.json';
import recruit from '../data/1111.json';
import sekaimen from '../data/sekaimen.json';
import guardianpie from '../data/guardianpie.json';

const CONTENT = {
  ruhachu,
  opt,
  1111: recruit,
  sekaimen,
  guardianpie,
};

export default function CaseStudy({ slug }) {
  const doc = CONTENT[slug];
  // The work list is the single source of truth for project names
  const title = PROJECTS.find((p) => p.slug === slug)?.title ?? doc?.title;

  usePageTitle(doc ? `${title} — Sandra Lai` : 'Sandra Lai');

  if (!doc) return <Navigate to="/404" replace />;

  return (
    <>
      <main className="cs">
        <div className="cs__col appear-up">
          <header className="cs__header">
            <h2 className="t-display">{title}</h2>

            {doc.subtitle && <p className="t-body cs__lead">{doc.subtitle}</p>}

            {doc.meta && (
              <p
                className="t-small cs__meta"
                dangerouslySetInnerHTML={{ __html: doc.meta }}
              />
            )}
          </header>

          {/* Cover art is pending — the placeholder holds the layout */}
          <div className="ph ph--cover" role="presentation" />

          {doc.blocks.map((block, i) => (
            <RichBlock key={i} items={block.items} />
          ))}
        </div>
      </main>

      <MoreWork currentSlug={slug} />
    </>
  );
}
