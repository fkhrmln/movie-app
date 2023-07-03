'use client';

import { IMAGE_URL } from '@/constants';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

type Props = {
  title: string;
  moviesPromise: Promise<MovieResponse>;
};

export default async function CardsPromise({ title, moviesPromise }: Props) {
  const res = await moviesPromise;

  const movies: Movie[][] = [
    res.results.slice(0, 5),
    res.results.slice(5, 10),
    res.results.slice(10, 15),
    res.results.slice(15, 20),
  ];

  return (
    <div className="mx-32">
      <h3 className="mb-3 ml-[9.15rem] text-lg font-semibold">{title}</h3>
      <Swiper modules={[Navigation]} navigation={true}>
        {movies.map((arrMovies, index) => (
          <SwiperSlide key={index}>
            {arrMovies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="mx-5 overflow-hidden rounded-lg">
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
