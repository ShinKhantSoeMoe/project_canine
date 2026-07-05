# Canine — Comic Reading Website

A React + Vite template for publishing and reading your comic. Dark theme, webtoon-style vertical reader, no backend required.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
```

## Project structure

```
public/comics/          Your comic images. One folder per comic,
                        one subfolder per chapter.
src/
  data/comics.js        THE CATALOG — the only file you edit to add
                        comics/chapters. Titles, covers, page lists.
  services/             Data access layer. Components never touch
    comicService.js     data/comics.js directly; they call these
                        functions. Swap in a real API here later
                        without touching any component.
  hooks/
    useAsync.js         Loads async data into components.
  pages/                One file per route (each with its .module.css):
    HomePage.jsx        /                       — library grid
    ComicPage.jsx       /comic/:id              — detail + chapters
    ReaderPage.jsx      /comic/:id/chapter/:id  — the reader
    NotFoundPage.jsx    404
  components/
    layout/             Header, Footer, Layout (shared page frame)
    comic/              ComicCard, ComicGrid, ChapterList
    reader/             ChapterNav (prev/next buttons)
    ui/                 Small reusable bits (Loading, ...)
  styles/global.css     Design tokens (colors, fonts, sizes) — edit
                        the CSS variables to re-theme everything.
  App.jsx               Route map — register new pages here.
```

## Adding a chapter

1. Export your pages as images (`.jpg`/`.png`/`.webp`, ~800px wide works well) into `public/comics/<comic-id>/<chapter-id>/`.
2. Add a chapter object to that comic in `src/data/comics.js`.

That's it — the chapter list, reader, and prev/next navigation pick it up automatically.

## Adding a whole new comic

1. Create `public/comics/<new-id>/` with a `cover` image and chapter folders.
2. Add an entry to the array in `src/data/comics.js`.

## Growing the site later

- **New page** (About, Updates…): add a file in `src/pages/`, register it in `App.jsx`, link it in `Header.jsx`.
- **Real backend/CMS**: rewrite the three functions in `src/services/comicService.js` to `fetch()` from your API. Nothing else changes.
- **Deploying**: `npm run build`, then host `dist/` on Netlify/Vercel/GitHub Pages. For direct links to work (e.g. `/comic/canine`), enable SPA fallback (Netlify: `public/_redirects` with `/* /index.html 200`).

The placeholder SVGs in `public/comics/` are just stand-ins — replace them with your real art.
