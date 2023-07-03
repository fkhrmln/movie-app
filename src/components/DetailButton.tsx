'use client';

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { FaPlay, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import WatchlistAlert from './WatchlistAlert';

type Props = {
  movie: DetailMovie;
  genres: string;
};

export default function DetailButton({ movie, genres }: Props) {
  const currentUserId = useAppSelector((state) => state.user?.id);
  const [isMutating, setIsMutating] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  async function addWatchlistHandler() {
    setIsMutating(true);

    const res = await fetch(`http://localhost:3000/api/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movie.id,
        user_id: currentUserId,
        title: movie.title,
        overview: movie.overview,
        genres: genres,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
      }),
    });

    const response = await res.json();

    if (res.status != 201) {
      setIsMutating(false);
      setMessage(response.message);
      setIsFailed(true);

      return;
    }

    setIsMutating(false);
    setMessage(response.message);
    setIsSuccess(true);
  }

  function closeHandler() {
    setIsSuccess(false);
    setIsFailed(false);
    setMessage('');
  }

  return (
    <div className="flex items-center gap-x-5 font-semibold">
      {isSuccess && (
        <div className="absolute right-5 top-24">
          <WatchlistAlert message={message} isSuccess={true} close={closeHandler} />
        </div>
      )}
      {isFailed && (
        <div className="absolute right-5 top-24">
          <WatchlistAlert message={message} isSuccess={false} close={closeHandler} />
        </div>
      )}
      <Link
        href={`/movies/${movie.id}/trailer`}
        className="flex items-center gap-x-2 rounded-sm bg-white/50 px-5 py-2 text-black"
      >
        <FaPlay className="mb-0.5" />
        <p>Play</p>
      </Link>
      <button
        onClick={addWatchlistHandler}
        disabled={isMutating ? true : false}
        className="flex items-center gap-x-2 rounded-sm bg-black/50 px-5 py-2 text-white"
      >
        <FaPlus className={`${isMutating && 'hidden'} mb-0.5`} />
        <p>{isMutating ? 'Saving . . .' : 'Add to Watchlist'}</p>
      </button>
    </div>
  );
}
