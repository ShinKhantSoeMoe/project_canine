import { useParams, Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { getComic } from '../services/comicService';
import ChapterList from '../components/comic/ChapterList';
import Loading from '../components/ui/Loading';
import NotFoundPage from './NotFoundPage';
import styles from './ComicPage.module.css';

/** Comic detail: cover, description, and the chapter list. */
export default function ComicPage() {
  const { comicId } = useParams();
  const { data: comic, loading } = useAsync(() => getComic(comicId), [comicId]);

  if (loading) return <Loading />;
  if (!comic) return <NotFoundPage />;

  const firstChapter = comic.chapters[0];

  return (
    <div className={styles.page}>
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
            <Link
              to={`/comic/${comic.id}/chapter/${firstChapter.id}`}
              className={styles.readButton}
            >
              Start Reading
            </Link>
          )}
        </div>
      </div>

      <h2 className={styles.chaptersHeading}>Chapters</h2>
      <ChapterList comicId={comic.id} chapters={comic.chapters} />
    </div>
  );
}
