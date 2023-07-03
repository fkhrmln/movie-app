'use client';

import { IMAGE_URL } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import { FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default async function Watchlist() {
  const router = useRouter();
  const currentUserId = useAppSelector((state) => state.user?.id);

  const res = await fetch(`http://localhost:3000/api/watchlist/${currentUserId}`);

  const watchlist: Watchlist[] = await res.json();

  async function deleteWatchlistHandler(id: number) {
    await fetch(`http://localhost/api/watchlist/${id}`, {
      method: 'POST',
    });

    router.refresh();
  }

  return (
    <div className="mx-20 mb-10 mt-20">
      <div className="container">
        <h3 className="mb-5 text-2xl">Watchlist</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-16">
          {watchlist.map((movie) => (
            <div key={movie.id}>
              <Link href={`/movies/${movie.movie_id}`} className="overflow-hidden">
                <Image
                  src={`${IMAGE_URL}/${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1024}
                  height={1024}
                  className="h-full w-full rounded-lg"
                />
              </Link>
              <div className="mt-2 flex items-center justify-between">
                <p>{movie.title}</p>
                <button onClick={() => deleteWatchlistHandler(movie.id)}>
                  <FiTrash2 className="text-netflix" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
