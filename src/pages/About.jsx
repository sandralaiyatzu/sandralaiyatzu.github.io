import { ABOUT } from '../data/site';
import usePageTitle from '../hooks/usePageTitle';

export default function About() {
  usePageTitle('About — Sandra Lai');

  return (
    <div className="about">
      <section className="about__intro appear-up">
        <img className="about__avatar" src={ABOUT.avatar} alt="Sandra Lai" />

        <h3 className="t-h3">{ABOUT.heading}</h3>

        <div className="about__copy">
          {ABOUT.paragraphs.map((text, i) => (
            <p key={i} className="t-body">
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className="about__section appear-up">
        <h3 className="t-h3">{ABOUT.quotesHeading}</h3>

        <div className="quotes">
          {ABOUT.quotes.map((q) => (
            <article className="quote" key={q.name}>
              <div className="quote__head">
                <img className="quote__avatar" src={q.avatar} alt={q.name} />
                <div>
                  <p className="t-body-lg quote__name">{q.name}</p>
                  <p className="t-small quote__role">{q.role}</p>
                </div>
              </div>
              <p className="t-small quote__text">{q.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
