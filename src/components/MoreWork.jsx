import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/site';

/**
 * Shown at the foot of every case study: compact cards for the other projects.
 * Driven by PROJECTS, so adding a project makes it appear here automatically.
 */
export default function MoreWork({ currentSlug }) {
  const others = PROJECTS.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;

  return (
    <section className="more" aria-labelledby="more-work-heading">
      <div className="more__inner">
        <h3 className="t-h3" id="more-work-heading">
          More Work
        </h3>

        <div className="more__grid" style={{ '--cols': others.length }}>
          {others.map((p) => (
            <Link className="mini" to={`/${p.slug}`} key={p.slug}>
              <div className="mini__media">
                <img src={p.cover} alt="" loading="lazy" />
              </div>
              <div className="mini__body">
                <h6 className="t-h6">{p.title}</h6>
                <p className="t-small mini__tags">{p.tags}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
