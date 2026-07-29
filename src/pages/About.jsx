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

      {ABOUT.sections.map((section) => (
        <section className="about__section appear-up" key={section.heading}>
          <h3 className="t-h3">{section.heading}</h3>

          <div className="about__blocks">
            {section.items.map((item, i) => (
              <article className="about__block" key={item.title ?? i}>
                {item.title && <h5 className="t-h5">{item.title}</h5>}
                <div className="about__copy">
                  {item.paragraphs.map((text, j) => (
                    <p key={j} className="t-body">
                      {text}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="t-body about__contact appear-up">
        {ABOUT.contact.lead}
        <a className="link" href={`mailto:${ABOUT.contact.email}`}>
          {ABOUT.contact.email}
        </a>
      </p>

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
