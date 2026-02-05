import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

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
      {/* VIDEO */}

      <div
        className="container"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Heading as="h1" className="hero__title">
          :)
        </Heading>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />

      {/* FINESTRA SPOSTATA FUORI DALL’HEADER */}
      <DesktopWindow title="Window manager">
        <Heading as="h1" className="hero__title">
          hi! i'm ale :)
        </Heading>

        <div className={styles.buttonWrapper}>
          <Link className="button button--secondary button--lg" to="/docs/">Docs</Link>
          <Link className="button button--secondary button--lg" to="/blog">Blog</Link>
        </div>
      </DesktopWindow>

      <main></main>
    </Layout>
  );
}
