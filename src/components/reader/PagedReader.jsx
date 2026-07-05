import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PagedReader.module.css';

/** Minimum horizontal swipe distance (px) to count as a page turn. */
const SWIPE_THRESHOLD = 50;
/** Page-turn animation length (ms) — keep in sync with the CSS transition. */
const TURN_DURATION = 220;

/**
 * Page mode: one page at a time.
 *
 * Navigation (all page-by-page, all animated):
 *   - Prev / Next buttons under the page
 *   - swipe RIGHT → next page   (swipe left → previous);
 *     the page follows your finger while dragging
 *   - tap/click right half of the page → next, left half → previous
 *   - arrow keys → next / previous
 *
 * Past the last page it moves on to the next chapter (if any).
 */
export default function PagedReader({ pages, chapterId, prevChapter, nextChapter }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0); // live finger offset while dragging (px)
  const [leaving, setLeaving] = useState(null); // 'left' | 'right' — old page slides out
  const [entering, setEntering] = useState(null); // 'left' | 'right' — new page slides in
  const touchStart = useRef(null);
  const busy = useRef(false); // ignore input mid-animation
  const navigate = useNavigate();

  const onLastPage = index === pages.length - 1;
  const onFirstPage = index === 0;

  // Restart at page 1 when the chapter changes.
  useEffect(() => {
    setIndex(0);
  }, [chapterId]);

  /**
   * Animated page turn. dir: 1 = next, -1 = previous.
   * Old page slides out one way; new page slides in from the other.
   */
  const turnPage = (dir) => {
    if (busy.current) return;

    // At the edges of the chapter, move between chapters instead.
    if (dir === 1 && onLastPage) {
      if (nextChapter) navigate(`/chapter/${nextChapter.id}`);
      return;
    }
    if (dir === -1 && onFirstPage) {
      if (prevChapter) navigate(`/chapter/${prevChapter.id}`);
      return;
    }

    busy.current = true;
    setLeaving(dir === 1 ? 'right' : 'left');

    setTimeout(() => {
      setIndex((i) => i + dir);
      setLeaving(null);
      // Place the new page just off-screen (no transition)...
      setEntering(dir === 1 ? 'left' : 'right');
      // ...wait one paint, then let it slide to the center.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setEntering(null);
          busy.current = false;
        })
      );
    }, TURN_DURATION);
  };

  const next = () => turnPage(1);
  const prev = () => turnPage(-1);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Touch: page follows the finger, then turns or snaps back on release.
  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchMove = (e) => {
    if (!touchStart.current || busy.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    // Only drag on mostly-horizontal movement; leave vertical scrolling alone.
    if (Math.abs(dx) > Math.abs(dy)) setDrag(dx);
  };

  const onTouchEnd = () => {
    if (touchStart.current === null) return;
    const dx = drag;
    touchStart.current = null;
    setDrag(0); // if we don't turn, CSS animates the snap-back
    if (dx > SWIPE_THRESHOLD) next(); // swipe right → next page
    if (dx < -SWIPE_THRESHOLD) prev(); // swipe left → previous page
  };

  // Tap/click zones: left half = prev, right half = next.
  const onClick = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isRightHalf = e.clientX - left > width / 2;
    isRightHalf ? next() : prev();
  };

  const pageClass = [
    styles.page,
    leaving === 'left' && styles.outLeft,
    leaving === 'right' && styles.outRight,
    entering === 'right' && styles.fromRight,
    entering === 'left' && styles.fromLeft,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <div
        className={styles.stage}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      >
        <img
          src={pages[index]}
          alt={`Page ${index + 1}`}
          className={pageClass}
          draggable={false}
          style={
            drag !== 0
              ? { transform: `translateX(${drag}px)`, transition: 'none' }
              : undefined
          }
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
