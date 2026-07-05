import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import useLocalStorage from '../hooks/useLocalStorage';
import { getChapter } from '../services/comicService';
import ChapterSelect from '../components/reader/ChapterSelect';
import ModeToggle from '../components/reader/ModeToggle';
import ScrollReader from '../components/reader/ScrollReader';
import PagedReader from '../components/reader/PagedReader';
import Loading from '../components/ui/Loading';
import NotFoundPage from './NotFoundPage';
import styles from './ReaderPage.module.css';

/**
 * The reader. Two modes, remembered between visits:
 *   - "scroll": all pages stacked vertically (webtoon style)
 *   - "paged":  one page at a time, swipe right / buttons for next page
 * Chapter switching happens via the dropdown in the top bar.
 */
export default function ReaderPage() {
  const { chapterId } = useParams();
  const { data, loading } = useAsync(() => getChapter(chapterId), [chapterId]);
  const [mode, setMode] = useLocalStorage('reader-mode', 'scroll');

  // Jump back to the top whenever the chapter changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  if (loading) return <Loading />;
  if (!data) return <NotFoundPage />;

  const { comic, chapter, prevChapter, nextChapter, allChapters } = data;

  return (
    <div className={styles.reader}>
      <header className={styles.topBar}>
        <Link to="/" className={styles.backLink}>
          ← {comic.title}
        </Link>
        <ChapterSelect chapters={allChapters} currentId={chapter.id} />
        <ModeToggle mode={mode} onChange={setMode} />
      </header>

      {mode === 'paged' ? (
        <PagedReader
          pages={chapter.pages}
          chapterId={chapter.id}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
        />
      ) : (
        <ScrollReader pages={chapter.pages} nextChapter={nextChapter} />
      )}
    </div>
  );
}
