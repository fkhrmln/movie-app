'use client';

import { IMAGE_URL } from '@/constants';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

export default async function SimilarCards({ moviesPromise }: { moviesPromise: Promise<MovieResponse> }) {
  const res = await moviesPromise;

  const movies: Movie[][] = [res.results.slice(0, 10), res.results.slice(10, 20)];

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">Similar Movies</h3>
      <Swiper>
        {movies.map((arrMovies, index) => (
          <SwiperSlide key={index}>
            {arrMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="mr-5 overflow-hidden rounded-lg">
                <Image
                  src={`${IMAGE_URL}/${movie.poster_path}`}
                  alt={movie.title}
                  width={125}
                  height={175}
                  className="h-full w-full"
                />
              </Link>
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
