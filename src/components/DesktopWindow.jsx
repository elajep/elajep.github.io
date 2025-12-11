import { Rnd } from "react-rnd";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useState, useEffect } from 'react';
import styles from './DesktopWindow.module.css';

export default function DesktopWindow({ title = "My Window", children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 900, height: 450 });

  // Calcola posizione centrata al mount e al resize
  useEffect(() => {
    const updatePosition = () => {
      const width = Math.min(650, window.innerWidth * 0.9);
      const height = Math.min(450, window.innerHeight * 0.8);
      const x = (window.innerWidth - width) / 2;
      const y = (window.innerHeight - height) / 2;
      setPosition({ x, y, width, height });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  if (!isOpen) return null;

  return (
    <BrowserOnly fallback={<div />}>
      {() => (
        <Rnd
          position={{ x: position.x, y: position.y }}
          size={{ width: position.width, height: position.height }}
          bounds="window"
          dragHandleClassName={styles.windowHeader}
          className={styles.rndWindow}
          minWidth={250}
          minHeight={200}
          onDragStop={(e, d) => setPosition(prev => ({ ...prev, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, newPos) =>
            setPosition({ width: ref.offsetWidth, height: ref.offsetHeight, x: newPos.x, y: newPos.y })
          }
        >
          <div className={styles.windowHeader}>
            <span>{title}</span>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>[x]</button>
          </div>

          <div className={styles.windowContent}>
            {children}
          </div>
        </Rnd>
      )}
    </BrowserOnly>
  );
}
