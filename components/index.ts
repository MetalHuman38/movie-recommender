import { JSX } from "react";

type PosterVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

export const variantStyles: Record<PosterVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface IMovies {
  id: number;
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
  imdbID: string;
  imdbRating: number;
  imdbVotes: number;
  metascore: number;
  type: string;
  response: boolean;
  error: string;
  country: string;
  layoutClassName?: string;
}

interface MoviesDataProps {
  movie_id: number[];
  renderMovie?: (movie: IMovies) => JSX.Element; // Custom render logic
  layoutClassName?: string;
  variant?: PosterVariant;
  coverColor?: string;
  coverUrl?: string;
  containerClassName?: string;
  title?: string;
  genre?: string;
  poster?: string;
  description?: string;
  rating?: number;
  year?: number;
  actors?: string[];
  director?: string;
  isSavedToWishlist?: boolean;
}

interface IRatings {
  user_id: number;
  movie_id: number;
  rating: number;
  timestamp: string;
}

interface IRatingsDataProps {
  ratings: IRatings[];
  renderRating?: (rating: IRatings) => JSX.Element; // Custom render logic
  containerClassName?: string;
  user_id?: number;
  movie_id?: number;
  rating?: number;
  timestamp?: string;
}

interface ITags {
  user_id: number;
  movie_id: number;
  tag: string;
  timestamp: string;
}

interface ITagsDataProps {
  tags: ITags[];
  renderTag?: (tag: ITags) => JSX.Element; // Custom render logic
  containerClassName?: string;
  user_id?: number;
  movie_id?: number;
  tag?: string;
  timestamp?: string;
}

interface ILinks {
  movie_id: number;
  imdb_id: string;
  tmdb_id: string;
}

interface ILinksDataProps {
  links: ILinks[];
  renderLink?: (link: ILinks) => JSX.Element; // Custom render logic
  containerClassName?: string;
  movie_id?: number;
  imdb_id?: string;
  tmdb_id?: string;
}

interface IMetaData {
  tmdb_id: string; // TMDB ID from your API
  poster: string; // URL for the poster
  title: string; // Movie title
  genres: string; // Comma-separated genres
  overview: string; // Movie overview
}

export type {
  IMovies,
  MoviesDataProps,
  PosterVariant,
  IRatings,
  IRatingsDataProps,
  ITags,
  ITagsDataProps,
  ILinks,
  ILinksDataProps,
  IMetaData,
};

interface TopPicksCardProps {
  movie_id: number;
  genres: string;
  title: string;
  poster_url: string;
  vote_average: number;
  tags: string;
  links: string;
  year: number;
  poster: string;
}

interface TopPicksDataProps {
  topPicks: TopPicksCardProps[];
  renderTopPick?: (topPick: TopPicksCardProps) => JSX.Element; // Custom render logic
  containerClassName?: string;
  movie_id?: number;
  genres?: string;
  title?: string;
  poster_url?: string;
  vote_average?: number;
  tags?: string;
  links?: string;
  year?: number;
  poster?: string;
}

interface RecommendationsProps {
  movie_id: number;
  genres: string;
  title: string;
  poster_url: string;
  vote_average: number;
  tags: string;
  links: string;
  year: number;
  poster: string;
}

interface RecommendationsDataProps {
  recommendations: RecommendationsProps[];
  renderRecommendation?: (recommendation: RecommendationsProps) => JSX.Element; // Custom render logic
  containerClassName?: string;
  movie_id?: number;
  genres?: string;
  title?: string;
  poster_url?: string;
  vote_average?: number;
  tags?: string;
  links?: string;
  year?: number;
  release_date?: string;
}

interface ISearchMovies {
  id: number;
  movie_id: number;
  title: string;
  year: number;
  vote_average: number;
  actors: string[];
  director: string;
  description: string;
  genres: string;
  poster_url: string;
  trailer: string;
  runtime: number;
  imdb_id: string;
  imdbRating: number;
  imdbVotes: number;
  metascore: number;
  type: string;
  response: boolean;
  error: string;
  country: string;
  layoutClassName?: string;
  overview: string;
  release_date: string;
}

interface SearchMoviesDataProps {
  searchMovies: ISearchMovies[];
  renderSearchMovie?: (searchMovie: ISearchMovies) => JSX.Element; // Custom render logic
  layoutClassName?: string;
  variant?: PosterVariant;
  coverColor?: string;
  coverUrl?: string;
  containerClassName?: string;
  title?: string;
  genres?: string;
  poster_url?: string;
  description?: string;
  vote_average?: number;
  year?: string;
  actors?: string[];
  director?: string;
  isSavedToWishlist?: boolean;
  movie_id?: number;
  isSearching?: boolean;
  movies?: ISearchMovies[];
  imdb_id?: string;
}

interface ChatBotCardProps {
  response: string;
  action: string;
}

interface ChatBotDataProps {
  chatbot: ChatBotCardProps[];
  renderChatBot?: (chatbot: ChatBotCardProps) => JSX.Element; // Custom render logic
  response?: string;
  action?: string;
}

export type {
  TopPicksCardProps,
  TopPicksDataProps,
  RecommendationsProps,
  RecommendationsDataProps,
  ISearchMovies,
  SearchMoviesDataProps,
  ChatBotDataProps,
  ChatBotCardProps,
};
