import { Link } from 'react-router-dom';
import styles from './ComicCard.module.css';

/** One cover tile in the library grid. */
export default function ComicCard({ comic }) {
  return (
    <Link to={`/comic/${comic.id}`} className={styles.card}>
      <img src={comic.cover} alt={`${comic.title} cover`} className={styles.cover} />
      <div className={styles.info}>
        <h3 className={styles.title}>{comic.title}</h3>
        <span className={styles.meta}>
          {comic.chapters.length} chapter{comic.chapters.length !== 1 && 's'} · {comic.status}
        </span>
      </div>
    </Link>
  );
}
