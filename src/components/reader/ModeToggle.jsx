import styles from './ModeToggle.module.css';

/** Scroll ↕ / Pages ↔ switch in the reader's top bar. */
export default function ModeToggle({ mode, onChange }) {
  return (
    <div className={styles.toggle} role="group" aria-label="Reading mode">
      <button
        className={mode === 'scroll' ? styles.active : styles.button}
        onClick={() => onChange('scroll')}
      >
        ↕ Scroll
      </button>
      <button
        className={mode === 'paged' ? styles.active : styles.button}
        onClick={() => onChange('paged')}
      >
        ↔ Pages
      </button>
    </div>
  );
}
