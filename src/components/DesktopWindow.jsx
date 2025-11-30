import { Rnd } from "react-rnd";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useState } from 'react';
import styles from './DesktopWindow.module.css';

export default function DesktopWindow({ title = "My Window", children }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <BrowserOnly fallback={<div />}>
      {() => {
        const width = 900;
        const height = 550;
        const x = (window.innerWidth - width) / 2;
        const y = (window.innerHeight - height) / 2;

        return (
          <Rnd
            default={{ x, y, width, height }}
            bounds="window"
            dragHandleClassName={styles.windowHeader}
            className={styles.rndWindow}
          >
            <div className={styles.windowHeader}>
              <span>{title}</span>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>[x]</button>
            </div>
            <div className={styles.windowContent}>
              {children}
            </div>
          </Rnd>
        );
      }}
    </BrowserOnly>
  );
}
