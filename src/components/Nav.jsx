import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <div className="nav-slot">
      <nav className="nav appear-nav" aria-label="Primary">
        <Link to="/" className="nav__logo">
          Sandra Lai
        </Link>

        <div className="nav__menu">
          {NAV_LINKS.map((item) =>
            item.href ? (
              <a
                key={item.label}
                className="nav__link link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                className={`nav__link link${pathname === item.to ? ' is-current' : ''}`}
                to={item.to}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
