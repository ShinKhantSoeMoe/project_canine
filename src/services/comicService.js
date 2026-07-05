/**
 * ---------------------------------------------------------------
 * DATA ACCESS LAYER
 * ---------------------------------------------------------------
 * Components get all data through these functions — never by
 * importing the data files directly. If you ever move to a
 * backend/CMS, only this file changes. Everything is async for
 * the same reason.
 */

import comicInfo from '../data/comic';
import chapters from '../data/chapters';

/** The comic with its full chapter list. */
export async function getComic() {
  return { ...comicInfo, chapters };
}

/**
 * One chapter plus its reading context:
 * previous/next chapters (null at the ends).
 */
export async function getChapter(chapterId) {
  const index = chapters.findIndex((ch) => ch.id === chapterId);
  if (index === -1) return null;

  return {
    comic: comicInfo,
    chapter: chapters[index],
    prevChapter: chapters[index - 1] ?? null,
    nextChapter: chapters[index + 1] ?? null,
  };
}
