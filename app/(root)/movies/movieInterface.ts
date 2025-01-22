interface IMovies {
  title: string;
  year: number;
  rating: number;
  actors: string[];
  director: string;
  description: string;
  genre: string;
  poster: string;
  trailer: string;
  runtime: number;
  id: number;
  imdbID: string;
  imdbRating: number;
  imdbVotes: number;
  metascore: number;
  type: string;
  response: boolean;
  error: string;
  country: string;
}

interface Metadata {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
}
