import ComicCard from './ComicCard';
import styles from './ComicGrid.module.css';

/** Responsive grid of comic covers. */
export default function ComicGrid({ comics }) {
  return (
    <div className={styles.grid}>
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}
