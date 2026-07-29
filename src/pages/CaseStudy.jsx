import { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

import RichBlock from '../components/RichBlock';
import MoreWork from '../components/MoreWork';
import Lightbox from '../components/Lightbox';
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
  const [zoomed, setZoomed] = useState(null);

  // The work list is the single source of truth for project names
  const title = PROJECTS.find((p) => p.slug === slug)?.title ?? doc?.title;

  usePageTitle(doc ? `${title} — Sandra Lai` : 'Sandra Lai');

  const close = useCallback(() => setZoomed(null), []);

  if (!doc) return <Navigate to="/404" replace />;

  return (
    <>
      <main className="cs">
        <div className="cs__col appear-up">
          <header className="cs__header">
            <h2 className="t-display">{title}</h2>

            {doc.meta && (
              <p
                className="t-small cs__meta"
                dangerouslySetInnerHTML={{ __html: doc.meta }}
              />
            )}

            {doc.lead && (
              <p
                className="t-small cs__lead"
                dangerouslySetInnerHTML={{ __html: doc.lead }}
              />
            )}
          </header>

          {doc.blocks.map((block, i) =>
            block.type === 'image' ? (
              block.placeholder ? (
                <div
                  className="ph ph--cover"
                  key={i}
                  role="presentation"
                  style={{ aspectRatio: String(block.ratio) }}
                />
              ) : (
                <button
                  type="button"
                  className="cs__figure"
                  key={i}
                  onClick={() => setZoomed(block)}
                  aria-label="Enlarge image"
                  style={{ aspectRatio: String(block.ratio) }}
                >
                  <img src={block.src} alt={block.alt || ''} loading="lazy" />
                </button>
              )
            ) : (
              <RichBlock key={i} items={block.items} onImageClick={setZoomed} />
            )
          )}
        </div>
      </main>

      <MoreWork currentSlug={slug} />

      <Lightbox image={zoomed} onClose={close} />
    </>
  );
}
