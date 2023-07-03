import { API_KEY, TMDB_URL } from '@/constants';

export default async function getTrailerMovie(id: number) {
  const res = await fetch(`${TMDB_URL}/${id}/videos?${API_KEY}`);

  if (!res.ok) return undefined;

  return res.json();
}
