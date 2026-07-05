import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { getChapter } from '../services/comicService';
import ChapterNav from '../components/reader/ChapterNav';
import Loading from '../components/ui/Loading';
import NotFoundPage from './NotFoundPage';
import styles from './ReaderPage.module.css';

/**
 * The reader: pages stacked vertically (webtoon style),
 * with chapter navigation above and below.
 */
export default function ReaderPage() {
  const { chapterId } = useParams();
  const { data, loading } = useAsync(() => getChapter(chapterId), [chapterId]);

  // Jump back to the top whenever the chapter changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  if (loading) return <Loading />;
  if (!data) return <NotFoundPage />;

  const { comic, chapter, prevChapter, nextChapter } = data;

  return (
    <div className={styles.reader}>
      <header className={styles.topBar}>
        <Link to="/" className={styles.backLink}>
          ← {comic.title}
        </Link>
        <span className={styles.chapterTitle}>
          Chapter {chapter.number}: {chapter.title}
        </span>
      </header>

      <ChapterNav prevChapter={prevChapter} nextChapter={nextChapter} />

      <div className={styles.pages}>
        {chapter.pages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Page ${i + 1}`}
            loading="lazy"
            className={styles.page}
          />
        ))}
      </div>

      <ChapterNav prevChapter={prevChapter} nextChapter={nextChapter} />
    </div>
  );
}
