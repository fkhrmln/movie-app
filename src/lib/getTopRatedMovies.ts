import { API_KEY, TMDB_URL } from '@/constants';

export default async function getTopRatedMovies() {
  const res = await fetch(`${TMDB_URL}/top_rated?${API_KEY}`);

  if (!res.ok) return undefined;

  return res.json();
}
