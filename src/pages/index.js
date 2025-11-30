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
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      <div
        className="container"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Heading as="h1" className="hero__title">
          you found me!
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

        <div className='button'>
          <Link className="button button--secondary button--lg" to="/docs/">Docs</Link>
          <Link className="button button--secondary button--lg" to="/blog">Blog</Link>
        </div>
      </DesktopWindow>

      <main></main>
    </Layout>
  );
}
