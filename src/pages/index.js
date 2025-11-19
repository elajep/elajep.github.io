import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header 
      className={clsx('hero hero--primary', styles.heroBanner)} 
      style={{ position: 'relative', overflow: 'hidden' }} // ⬅️ NECESSARIO
    >
      {/* CONTENUTO */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <Heading as="h1" className="hero__title">
          hi! i'm ale :)
        </Heading>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/">
            Docs
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Blog
          </Link>
        </div>
      </div>
    </header>
    
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}