import { Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { getComic } from '../services/comicService';
import ChapterList from '../components/comic/ChapterList';
import Loading from '../components/ui/Loading';
import styles from './HomePage.module.css';

/** The comic's landing page: cover, description, chapter list. */
export default function HomePage() {
  const { data: comic, loading } = useAsync(getComic);

  if (loading) return <Loading />;

  const firstChapter = comic.chapters[0];

  return (
    <div>
      <div className={styles.hero}>
        <img src={comic.cover} alt={`${comic.title} cover`} className={styles.cover} />
        <div>
          <h1>{comic.title}</h1>
          <p className={styles.author}>by {comic.author}</p>
          <p className={styles.tags}>
            {comic.status} · {comic.tags.join(' · ')}
          </p>
          <p className={styles.description}>{comic.description}</p>
          {firstChapter && (
            <Link to={`/chapter/${firstChapter.id}`} className={styles.readButton}>
              Start Reading
            </Link>
          )}
        </div>
      </div>

      <h2 className={styles.chaptersHeading}>Chapters</h2>
      <ChapterList chapters={comic.chapters} />
    </div>
  );
}
