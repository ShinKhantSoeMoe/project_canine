import { Link } from 'react-router-dom';
import styles from './ChapterList.module.css';

/** Clickable chapter list on a comic's detail page (newest first). */
export default function ChapterList({ comicId, chapters }) {
  const sorted = [...chapters].sort((a, b) => b.number - a.number);

  return (
    <ul className={styles.list}>
      {sorted.map((ch) => (
        <li key={ch.id}>
          <Link to={`/comic/${comicId}/chapter/${ch.id}`} className={styles.row}>
            <span className={styles.title}>
              Chapter {ch.number}: {ch.title}
            </span>
            <span className={styles.date}>{ch.releaseDate}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
