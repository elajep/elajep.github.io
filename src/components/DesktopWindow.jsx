import { Rnd } from "react-rnd";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useState, useEffect } from 'react';
import styles from './DesktopWindow.module.css';

// Variabile globale che tiene traccia del livello di profondità massimo
// Inizia da 100 per stare sopra eventuali elementi di sfondo
let currentMaxZIndex = 100;

export default function DesktopWindow({
  title = "My Window",
  children,
  isFirst = false,
  width = 300,
  height = 150
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Ogni finestra ha il suo stato locale per lo zIndex
  const [zIndex, setZIndex] = useState(0);

  // Funzione per portare la finestra in primo piano
  const bringToFront = () => {
    currentMaxZIndex += 1;
    setZIndex(currentMaxZIndex);
  };

  useEffect(() => {
    if (isOpen && !isInitialized) {
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      // 1. Calcolo posizione iniziale
      let initialX, initialY;
      if (isFirst) {
        initialX = (winW - width) / 2;
        initialY = (winH - height) / 2;
      } else {
        initialX = Math.random() * (winW - width - 60) + 30;
        initialY = Math.random() * (winH - height - 60) + 30;
      }

      // 2. Assegnazione z-index di nascita (sempre il più alto disponibile)
      bringToFront();

      setPosition({ x: initialX, y: initialY });
      setIsInitialized(true);
    }
  }, [isOpen, isInitialized, isFirst, width, height]);

  if (!isOpen || !isInitialized) return null;

  return (
    <BrowserOnly>
      {() => (
        <Rnd
          className={styles.rndWindow}
          default={{
            x: position.x,
            y: position.y,
            width: width,
            height: height,
          }}
          // Porta sopra quando inizi a trascinare o ridimensionare
          onDragStart={bringToFront}
          onResizeStart={bringToFront}
          dragHandleClassName={styles.windowHeader}
          bounds="window"
          style={{ zIndex: zIndex, position: 'fixed' }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            onMouseDown={bringToFront} // Porta sopra appena la clicchi
          >
            <div className={styles.windowHeader}>
              <span className={styles.windowTitle}>{title}</span>
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                ✕
              </button>
            </div>
            <div className={styles.windowContent}>
              {children}
            </div>
          </div>
        </Rnd>
      )}
    </BrowserOnly>
  );
}
