type User = {
  id: string;
  username: string;
  password: string;
};
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieResponse = {
  results: Movie[];
};

type DetailMovie = {
  adult: boolean;
  backdrop_path: string;
  // belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  // production_companies:  ProductionCompany[];
  // production_countries:  ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  // spoken_languages:      SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Genre = {
  id: number;
  name: string;
};

type Trailer = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
};

type TrailerResponse = {
  id: number;
  results: Trailer[];
};

type State = {
  user: {
    id: string;
    username: string;
  };
};

type Watchlist = {
  id: number;
  movie_id: number;
  user_id: string;
  title: string;
  overview: string;
  genres: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
};

type WatchlistResponse = {
  watchlist: Watchlist[];
};
