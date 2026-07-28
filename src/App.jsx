import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import { CASE_SLUGS } from './data/site';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {CASE_SLUGS.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<CaseStudy slug={slug} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}
