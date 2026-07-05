# Canine — Comic Reading Website

A React + Vite site for publishing and reading your comic. Dark theme, webtoon-style vertical reader, no backend required.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
```

## Publishing a new chapter — just add a folder of images

```
src/chapters/
  01-the-stray/
    01.svg
    02.svg
  02-neon-alleys/
    ...
  03-your-new-chapter/   ← drop your images here, done!
    01.png
    02.png
```

Folder name convention: `<number>-<title-in-kebab-case>`, so `03-into-the-dark` becomes "Chapter 3: Into The Dark". Pages are shown in filename order — number them `01`, `02`, `03`… Supported formats: png, jpg, jpeg, webp, gif, avif, svg.

No code changes needed. Chapters are discovered automatically at build time (`src/data/chapters.js`), and the chapter list, reader, and prev/next navigation all pick up the new chapter.

To change the comic's title, author, description, or cover: edit `src/data/comic.js` (cover image lives in `src/assets/`).

## Project structure

```
src/
  chapters/             YOUR COMIC PAGES — one folder per chapter.
  assets/               Cover image and other static art.
  data/
    comic.js            Title, author, description, cover.
    chapters.js         Auto-discovers chapters from src/chapters/.
                        You never edit this.
  services/
    comicService.js     Data access layer. Components only get data
                        through these functions — to move to a real
                        API/CMS later, rewrite only this file.
  hooks/
    useAsync.js         Loads async data into components.
  pages/                One file per route (each with its .module.css):
    HomePage.jsx        /                    — cover, info, chapter list
    ReaderPage.jsx      /chapter/:chapterId  — the reader
    NotFoundPage.jsx    404
  components/
    layout/             Header, Footer, Layout (shared page frame)
    comic/              ChapterList
    reader/             ChapterNav (prev/next buttons)
    ui/                 Small reusable bits (Loading, ...)
  styles/global.css     Design tokens (colors, fonts, sizes) — edit
                        the CSS variables to re-theme everything.
  App.jsx               Route map — register new pages here.
```

## Growing the site later

- **New page** (About, Updates…): add a file in `src/pages/`, register it in `App.jsx`, link it in `Header.jsx`.
- **Real backend/CMS**: rewrite the functions in `src/services/comicService.js` to `fetch()` from your API. Nothing else changes.
- **Deploying**: `npm run build`, then host `dist/` on Netlify/Vercel/GitHub Pages. For direct links to work (e.g. `/chapter/2`), enable SPA fallback (Netlify: a `_redirects` file with `/* /index.html 200`).

The placeholder SVGs in `src/chapters/` are just stand-ins — replace them with your real art.
