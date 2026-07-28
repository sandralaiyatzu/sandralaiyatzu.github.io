import { Link } from 'react-router-dom';
import { HERO, PROJECTS, EMAIL } from '../data/site';
import usePageTitle from '../hooks/usePageTitle';

function WorkCard({ project }) {
  return (
    <Link className="card" to={`/${project.slug}`}>
      <div className="card__media">
        {project.cover ? (
          <img src={project.cover} alt="" />
        ) : (
          <div className="ph" role="presentation" />
        )}
      </div>

      <div className="card__body">
        <div className="card__head">
          <div className="card__head-title">
            <h6 className="t-h6">{project.title}</h6>
          </div>
          <div className="card__head-tags">
            <p className="t-body card__tag">{project.tags}</p>
          </div>
        </div>
        <p className="t-body card__desc">{project.description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  usePageTitle('Sandra Lai');

  return (
    <main className="home">
      <section className="hero appear-up">
        <h2 className="t-display hero__title">
          <span>{HERO.lines[0]}</span>
          <br />
          <span>{HERO.lines[1]}</span>
        </h2>

        <p className="t-body hero__intro">{HERO.intro}</p>

        <a className="btn" href={EMAIL}>
          <span className="t-body-lg">{HERO.cta}</span>
        </a>
      </section>

      <section className="work appear-up">
        {PROJECTS.map((p) => (
          <WorkCard key={p.slug} project={p} />
        ))}
      </section>
    </main>
  );
}
