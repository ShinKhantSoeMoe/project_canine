/**
 * ---------------------------------------------------------------
 * AUTOMATIC CHAPTER DISCOVERY — you never edit this file.
 * ---------------------------------------------------------------
 * To publish a new chapter, just add a folder of images:
 *
 *   src/chapters/03-into-the-dark/
 *     01.png
 *     02.png
 *     ...
 *
 * Folder name convention:  <number>-<title-in-kebab-case>
 *   "03-into-the-dark"  →  Chapter 3: "Into The Dark"
 *
 * Pages are ordered by filename, so number them 01, 02, 03…
 * Supported formats: png, jpg, jpeg, webp, gif, avif, svg.
 *
 * How it works: Vite's import.meta.glob scans the chapters folder
 * at build time and gives us a URL for every image. We group the
 * images by folder and parse number/title from the folder name.
 */

const images = import.meta.glob(
  '../chapters/*/*.{png,jpg,jpeg,webp,gif,avif,svg}',
  { eager: true, query: '?url', import: 'default' }
);

/** "03-into-the-dark" → { number: 3, title: "Into The Dark" } */
function parseFolderName(folder) {
  const match = folder.match(/^(\d+)[-_ ]*(.*)$/);
  const number = match ? Number(match[1]) : 0;
  const title = (match?.[2] ?? folder)
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
  return { number, title: title || `Chapter ${number}` };
}

// Group image URLs by chapter folder.
const byFolder = {};
for (const [path, url] of Object.entries(images)) {
  // path looks like: ../chapters/01-the-stray/02.svg
  const [, folder, file] = path.match(/chapters\/([^/]+)\/([^/]+)$/);
  (byFolder[folder] ??= []).push({ file, url });
}

// Build the sorted chapter list.
const chapters = Object.entries(byFolder)
  .map(([folder, pages]) => {
    const { number, title } = parseFolderName(folder);
    return {
      id: String(number),
      number,
      title,
      pages: pages
        .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
        .map((p) => p.url),
    };
  })
  .sort((a, b) => a.number - b.number);

export default chapters;
