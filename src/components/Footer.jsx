import { Fragment } from 'react';
import { FOOTER_LINKS } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        {FOOTER_LINKS.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <span className="footer__sep">|</span>}
            <a
              className="nav__link link"
              href={item.href}
              {...(item.href.startsWith('http')
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              {item.label}
            </a>
          </Fragment>
        ))}
      </div>
    </footer>
  );
}
