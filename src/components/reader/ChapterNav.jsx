import { Link } from 'react-router-dom';
import styles from './ChapterNav.module.css';

/** Prev / next chapter buttons, shown above and below the pages. */
export default function ChapterNav({ comicId, prevChapter, nextChapter }) {
  return (
    <nav className={styles.nav}>
      {prevChapter ? (
        <Link to={`/comic/${comicId}/chapter/${prevChapter.id}`} className={styles.button}>
          ← Ch. {prevChapter.number}
        </Link>
      ) : (
        <span className={`${styles.button} ${styles.disabled}`}>← Prev</span>
      )}

      {nextChapter ? (
        <Link to={`/comic/${comicId}/chapter/${nextChapter.id}`} className={styles.button}>
          Ch. {nextChapter.number} →
        </Link>
      ) : (
        <span className={`${styles.button} ${styles.disabled}`}>Next →</span>
      )}
    </nav>
  );
}
