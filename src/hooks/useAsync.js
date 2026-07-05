import { useEffect, useState } from 'react';

/**
 * Small helper for loading async data into a component.
 * Returns { data, loading, error }.
 *
 * Usage:
 *   const { data: comic, loading } = useAsync(() => getComic(comicId), [comicId]);
 */
export default function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    asyncFn()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error }));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
