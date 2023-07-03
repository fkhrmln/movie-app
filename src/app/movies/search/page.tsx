'use client';

import { IMAGE_URL } from '@/constants';
import getSearchMovies from '@/lib/getSearchMovies';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { FiSearch } from 'react-icons/fi';
import CardsLoading from '@/components/CardsLoading';

export default function Search() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<undefined | Movie[]>(undefined);
  const [isMutating, setIsMutating] = useState(false);

  async function submitHandler(e: FormEvent<HTMLFormElement>, query: string) {
    e.preventDefault();

    setIsMutating(true);

    const res: MovieResponse = await getSearchMovies(query);

    setIsMutating(false);

    setMovies(res.results);
  }

  return (
    <div className="mx-20 mt-20">
      <div className="container mx-auto flex flex-col">
        <form onSubmit={(e) => submitHandler(e, search)} className="relative flex self-end text-black">
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md px-2 py-0.5"
          />
          <button type="submit" className="absolute right-2 top-1.5">
            <FiSearch />
          </button>
        </form>
        {isMutating ? (
          <div className="mt-32">
            <CardsLoading />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-4 gap-x-5 gap-y-10">
            {movies?.map((movie) => (
              <div key={movie.id}>
                <Link href={`/movies/${movie.id}`} className="overflow-hidden">
                  <Image
                    src={`${IMAGE_URL}/${movie.backdrop_path}`}
                    alt={movie.title}
                    width={1024}
                    height={1024}
                    className="h-full w-full rounded-lg"
                  />
                </Link>
                <p className="mt-2">{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
