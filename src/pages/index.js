import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Head from '@docusaurus/Head';

import DesktopWindow from '../components/DesktopWindow';

function HomepageHeader() {
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <div
        className="container"
        style={{ position: 'relative', zIndex: 10 }}
      >
      </div>
    </header>
  );
}

import React from 'react';
// Assicurati di mantenere le tue importazioni originali

const asciiArt = `
 ▄ .▄▪  ▪  • ▌ ▄ ·.      ▄▄▄· ▄▄▌  ▄▄▄ .
██▪▐███ ██ ·██ ▐███▪    ▐█ ▀█ ██•  ▀▄.▀·
██▀▐█▐█·▐█·▐█ ▌▐▌▐█·    ▄█▀▀█ ██▪  ▐▀▀▪▄
██▌▐▀▐█▌▐█▌██ ██▌▐█▌    ▐█ ▪▐▌▐█▌▐▌▐█▄▄▌
▀▀▀ ·▀▀▀▀▀▀▀▀  █▪▀▀▀     ▀  ▀ .▀▀▀  ▀▀▀
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <body className="homepage-body" />
      </Head>
      {/* Dimensioni aggiornate per ospitare tranquillamente tutto */}
      <DesktopWindow title="System manager" isFirst={true} width={390} height={220}>

        {/* UNICO BLOCCO per ASCII art e testo descrittivo */}
        <div style={{ paddingBottom: '20px' }}>

          <pre style={{
            margin: '0 0 15px 0',
            // Questa riga salva l'ASCII art dal font di XP
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '11px',
            lineHeight: '11px', // Tiene i blocchi uniti
            color: '#000'
          }}>
            {asciiArt}
          </pre>

          Welcome to my little space on the internet.

        </div>

        {/* I bottoni restano separati e spinti in basso dal tuo CSS originale */}
        <div className={styles.buttonWrapper}>
          <Link className="button button--secondary button--lg" to="/docs/">Docs</Link>
          <Link className="button button--secondary button--lg" to="/blog">Blog</Link>
        </div>

      </DesktopWindow>

      <HomepageHeader />

      <main></main>
    </Layout>
  );
}
