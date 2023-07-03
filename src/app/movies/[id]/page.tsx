import { Suspense } from 'react';
import DetailButton from '@/components/DetailButton';
import Rating from '@/components/Rating';
import { GENRES, IMAGE_URL } from '@/constants';
import getDetailMovie from '@/lib/getDetailMovie';
import getNowPlayingMovies from '@/lib/getNowPlayingMovies';
import getPopularMovies from '@/lib/getPopularMovies';
import getSimilarMovies from '@/lib/getSimilarMovies';
import getTopRatedMovies from '@/lib/getTopRatedMovies';
import { Metadata } from 'next';
import CardsLoading from '@/components/CardsLoading';
import SimilarCards from '@/components/SimilarCards';

type Props = {
  params: {
    id: number;
  };
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const movie: DetailMovie = await getDetailMovie(id);

  return {
    title: movie.title,
  };
}

export async function generateStaticParams() {
  const [nowPlayingMovies, popularMovies, topRatedMovies] = await Promise.all<Promise<MovieResponse>>([
    getNowPlayingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const movies: Movie[] = [...nowPlayingMovies.results, ...popularMovies.results, ...topRatedMovies.results];

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function Movie({ params: { id } }: Props) {
  const movie: DetailMovie = await getDetailMovie(id);

  const genres = movie.genres
    .filter((genre) => GENRES.map((gen) => gen.id === genre.id))
    .map((g) => g.name)
    .join(', ');

  const similarMovies = getSimilarMovies(movie.id);

  return (
    <div style={{ backgroundImage: `url('${IMAGE_URL}/${movie.backdrop_path}')`, backgroundSize: 'cover' }}>
      <div className="flex flex-col gap-y-3 pb-5 pl-20 pt-36">
        <div className="flex max-w-lg flex-col gap-y-3">
          <h1 className="text-4xl font-semibold tracking-wider">{movie.title}</h1>
          <p className="tracking-wide">{movie.overview}</p>
          <p>{genres}</p>
          <Rating rating={movie.vote_average} />
          <DetailButton movie={movie} genres={genres} />
        </div>
        <div className="max-w-7xl">
          <Suspense fallback={<CardsLoading />}>
            <SimilarCards moviesPromise={similarMovies} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
