import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ComicPage from './pages/ComicPage';
import ReaderPage from './pages/ReaderPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Route map — add new pages here.
 *
 * /                                → HomePage    (library of all comics)
 * /comic/:comicId                  → ComicPage   (cover, description, chapter list)
 * /comic/:comicId/chapter/:chapterId → ReaderPage (the actual reader)
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/comic/:comicId" element={<ComicPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Reader lives outside Layout for a distraction-free, full-width view */}
      <Route path="/comic/:comicId/chapter/:chapterId" element={<ReaderPage />} />
    </Routes>
  );
}
