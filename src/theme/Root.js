import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Usiamo un piccolo timeout per assicurarci che il DOM sia pronto
    const timeout = setTimeout(() => {

      // 1. LOGICA PER EQUAZIONI KATEX
      let eq = 1;
      document.querySelectorAll('.katex-display').forEach(el => {
        const id = `eq-${eq}`;
        el.setAttribute('data-eq-number', `(${eq})`);
        el.setAttribute('id', id);
        eq++;
      });

      // 2. LOGICA PER AUTO-COLLAPSE SIDEBAR
      const expandedCategories = document.querySelectorAll(
        '.menu__list-item-collapsible > [aria-expanded="true"]'
      );

      expandedCategories.forEach((category) => {
        const parentListItem = category.closest('.menu__list-item');

        // Chiude la cartella se NON contiene il file attivo (.menu__link--active)
        if (parentListItem && !parentListItem.querySelector('.menu__link--active')) {
          // Usiamo click() per attivare la logica interna di Docusaurus
          category.click();
        }
      });

    }, 100); // 100ms sono solitamente sufficienti per il caricamento del DOM

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Si riesegue ad ogni cambio pagina

  return <>{children}</>;
}
