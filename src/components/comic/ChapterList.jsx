import { Link } from 'react-router-dom';
import styles from './ChapterList.module.css';

/** Clickable chapter list on the home page (newest first). */
export default function ChapterList({ chapters }) {
  const sorted = [...chapters].sort((a, b) => b.number - a.number);

  return (
    <ul className={styles.list}>
      {sorted.map((ch) => (
        <li key={ch.id}>
          <Link to={`/chapter/${ch.id}`} className={styles.row}>
            <span className={styles.title}>
              Chapter {ch.number}: {ch.title}
            </span>
            <span className={styles.meta}>{ch.pages.length} pages</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
