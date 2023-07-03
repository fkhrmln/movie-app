import { Suspense } from 'react';
import Cards from '@/components/Cards';
import CardsPromise from '@/components/CardsPromise';
import getNowPlayingMovies from '@/lib/getNowPlayingMovies';
import getPopularMovies from '@/lib/getPopularMovies';
import CardsLoading from '@/components/CardsLoading';
import getTopRatedMovies from '@/lib/getTopRatedMovies';

export default async function Movies() {
  const res: MovieResponse = await getNowPlayingMovies();

  const nowPlayingMovies: Movie[] = res.results;

  const popularMovies = getPopularMovies();

  const topRatedMovies = getTopRatedMovies();

  return (
    <div className="mb-10 mt-20 flex flex-col gap-y-10">
      <Cards
        title="Now Playing Movies"
        movies={[
          nowPlayingMovies.slice(0, 5),
          nowPlayingMovies.slice(5, 10),
          nowPlayingMovies.slice(10, 15),
          nowPlayingMovies.slice(15, 20),
        ]}
      />
      <Suspense fallback={<CardsLoading />}>
        <CardsPromise title="Popular Movies" moviesPromise={popularMovies} />
      </Suspense>
      <Suspense fallback={<CardsLoading />}>
        <CardsPromise title="Top Rated Movies" moviesPromise={topRatedMovies} />
      </Suspense>
    </div>
  );
}
