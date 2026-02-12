import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
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
      <div
        className="container"
        style={{ position: 'relative', zIndex: 10 }}
      >
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout>

      <DesktopWindow title="System manager" isFirst={true} width={350} height={150}>
        Hi, i'm ale ! <br></br>
        Welcome to my little space on the internet.

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
