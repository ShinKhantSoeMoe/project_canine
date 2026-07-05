import useAsync from '../hooks/useAsync';
import { getComics } from '../services/comicService';
import ComicGrid from '../components/comic/ComicGrid';
import Loading from '../components/ui/Loading';
import styles from './HomePage.module.css';

/** The library — every comic on the site. */
export default function HomePage() {
  const { data: comics, loading } = useAsync(getComics);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className={styles.heading}>Library</h1>
      <ComicGrid comics={comics} />
    </>
  );
}
