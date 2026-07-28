import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('404 — Sandra Lai');

  return (
    <div className="nf appear-up">
      <div className="nf__box">
        <h1 className="t-hero">404</h1>
        <h3 className="t-h3">Oops! Something went wrong</h3>
      </div>

      <Link className="t-small link nf__link" to="/">
        Go home
      </Link>
    </div>
  );
}
