import { Link } from 'react-router-dom';
import styles from './ScrollReader.module.css';

/**
 * Webtoon mode: all pages stacked vertically, just scroll.
 * A "Next Chapter" button waits at the bottom (chapter switching
 * is otherwise done via the dropdown in the top bar).
 */
export default function ScrollReader({ pages, nextChapter }) {
  return (
    <div className={styles.pages}>
      {pages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Page ${i + 1}`}
          loading="lazy"
          className={styles.page}
        />
      ))}

      {nextChapter && (
        <div className={styles.endNav}>
          <Link to={`/chapter/${nextChapter.id}`} className={styles.nextButton}>
            Next Chapter →
          </Link>
        </div>
      )}
    </div>
  );
}
