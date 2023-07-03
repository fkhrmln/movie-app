import { API_KEY, TMDB_URL } from '@/constants';

export default async function getDetailMovie(id: number) {
  const res = await fetch(`${TMDB_URL}/${id}?${API_KEY}`, { next: { revalidate: 3600 } });

  if (!res.ok) return undefined;

  return res.json();
}
