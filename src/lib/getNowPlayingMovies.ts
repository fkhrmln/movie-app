import { API_KEY, TMDB_URL } from '@/constants';

export default async function getNowPlayingMovies() {
  const res = await fetch(`${TMDB_URL}/now_playing?${API_KEY}`);

  if (!res.ok) return undefined;

  return res.json();
}
