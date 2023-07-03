import { API_KEY, TMDB_URL } from '@/constants';

export default async function getPopularMovies() {
  const res = await fetch(`${TMDB_URL}/popular?${API_KEY}`);

  if (!res.ok) return undefined;

  return res.json();
}
