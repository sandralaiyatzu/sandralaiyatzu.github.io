import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape, on outside click, and once the viewport leaves mobile
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const mq = window.matchMedia('(min-width: 810px)');
    const onChange = (e) => e.matches && setOpen(false);

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  const renderLink = (item, cls) =>
    item.href ? (
      <a
        key={item.label}
        className={cls}
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        {item.label}
      </a>
    ) : (
      <Link
        key={item.label}
        className={`${cls}${pathname === item.to ? ' is-current' : ''}`}
        to={item.to}
      >
        {item.label}
      </Link>
    );

  return (
    <div className="nav-slot">
      <nav className="nav appear-nav" aria-label="Primary">
        <Link to="/" className="nav__logo">
          Sandra Lai
        </Link>

        {/* Desktop / tablet */}
        <div className="nav__menu">
          {NAV_LINKS.map((item) => renderLink(item, 'nav__link link'))}
        </div>

        {/* Mobile */}
        <button
          ref={buttonRef}
          type="button"
          className={`nav__toggle${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bar" />
          <span className="nav__bar" />
        </button>
      </nav>

      <div
        id="nav-mobile-panel"
        ref={panelRef}
        className={`nav__panel${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        {NAV_LINKS.map((item) => renderLink(item, 'nav__panel-link link'))}
      </div>
    </div>
  );
}
