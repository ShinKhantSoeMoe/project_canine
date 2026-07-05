import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PagedReader.module.css';

/** Minimum horizontal swipe distance (px) to count as a page turn. */
const SWIPE_THRESHOLD = 50;

/**
 * Page mode: one page at a time.
 *
 * Navigation (all page-by-page):
 *   - Prev / Next buttons under the page
 *   - swipe RIGHT → next page   (swipe left → previous)
 *   - tap/click right half of the page → next, left half → previous
 *   - arrow keys → next / previous
 *
 * Past the last page it moves on to the next chapter (if any).
 * To flip the swipe direction, swap `next()` and `prev()` in onTouchEnd.
 */
export default function PagedReader({ pages, chapterId, prevChapter, nextChapter }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const navigate = useNavigate();

  const onLastPage = index === pages.length - 1;
  const onFirstPage = index === 0;

  // Restart at page 1 when the chapter changes.
  useEffect(() => {
    setIndex(0);
  }, [chapterId]);

  const next = () => {
    if (!onLastPage) setIndex(index + 1);
    else if (nextChapter) navigate(`/chapter/${nextChapter.id}`);
  };

  const prev = () => {
    if (!onFirstPage) setIndex(index - 1);
    else if (prevChapter) navigate(`/chapter/${prevChapter.id}`);
  };

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Touch (swipe) navigation.
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > SWIPE_THRESHOLD) next(); // swipe right → next page
    if (dx < -SWIPE_THRESHOLD) prev(); // swipe left → previous page
  };

  // Tap/click zones: left half = prev, right half = next.
  const onClick = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isRightHalf = e.clientX - left > width / 2;
    isRightHalf ? next() : prev();
  };

  return (
    <div>
      <div
        className={styles.stage}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      >
        <img
          src={pages[index]}
          alt={`Page ${index + 1}`}
          className={styles.page}
          draggable={false}
        />
      </div>

      <nav className={styles.nav}>
        <button
          className={styles.button}
          onClick={prev}
          disabled={onFirstPage && !prevChapter}
        >
          ← Prev
        </button>

        <span className={styles.counter}>
          {index + 1} / {pages.length}
        </span>

        <button
          className={styles.button}
          onClick={next}
          disabled={onLastPage && !nextChapter}
        >
          {onLastPage && nextChapter ? 'Next Chapter →' : 'Next →'}
        </button>
      </nav>
    </div>
  );
}
