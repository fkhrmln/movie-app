import { API_KEY, TMDB_URL } from '@/constants';

export default async function getSimilarMovies(id: number) {
  const res = await fetch(`${TMDB_URL}/${id}/similar?${API_KEY}`);

  if (!res.ok) return undefined;

  return res.json();
}
