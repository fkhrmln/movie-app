import { API_KEY } from '@/constants';

export default async function getSearchMovies(query: string) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&${API_KEY}`, { cache: 'no-store' });

  if (!res.ok) return undefined;

  return res.json();
}
