import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';


export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      let eq = 1;

      document.querySelectorAll('.katex-display').forEach(el => {
        const id = `eq-${eq}`;

        el.setAttribute('data-eq-number', `(${eq})`);
        el.setAttribute('id', id);

        eq++;
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return <>{children}</>;
}

