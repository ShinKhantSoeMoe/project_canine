import styles from './Loading.module.css';

/** Simple loading indicator used while data resolves. */
export default function Loading({ label = 'Loading…' }) {
  return <p className={styles.loading}>{label}</p>;
}
