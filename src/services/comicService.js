/**
 * ---------------------------------------------------------------
 * DATA ACCESS LAYER
 * ---------------------------------------------------------------
 * Every component gets data through these functions — never by
 * importing src/data/comics.js directly. That way, when you outgrow
 * static data and add a backend (REST API, CMS, database), you only
 * rewrite this file. Everything is async for the same reason.
 */

import comics from '../data/comics';

/** All comics, for the library/home page. */
export async function getComics() {
  return comics;
}

/** One comic by id, or null. */
export async function getComic(comicId) {
  return comics.find((c) => c.id === comicId) ?? null;
}

/**
 * A chapter plus its reading context:
 * the parent comic and the previous/next chapters (null at the ends).
 */
export async function getChapter(comicId, chapterId) {
  const comic = await getComic(comicId);
  if (!comic) return null;

  const index = comic.chapters.findIndex((ch) => ch.id === chapterId);
  if (index === -1) return null;

  return {
    comic,
    chapter: comic.chapters[index],
    prevChapter: comic.chapters[index - 1] ?? null,
    nextChapter: comic.chapters[index + 1] ?? null,
  };
}
