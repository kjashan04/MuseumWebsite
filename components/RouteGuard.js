import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getFavourites, getHistory } from '@/lib/userData';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    const handleRouteChange = async (url) => {
      const token = localStorage.getItem('token');
      const pathIsPublic = PUBLIC_PATHS.includes(url);

      if (!token && !pathIsPublic) {
        router.push('/login');
      } else {
        await updateAtoms();
      }
    };

    handleRouteChange(router.pathname); // initial run
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return children;
}
