"use client"; // This makes it a Client Component

import React from "react";
import { Button } from "@/components/ui/button";
import PlayIcon from "./icons/PlayIcon";
import StarIcon from "./icons/StarIcon";
import CastList from "./CastList";

interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  cast: CastMember[];
}

interface Props {
  movie: Movie;
}

const MovieDetailsClient: React.FC<Props> = ({ movie }) => {
  const handleButtonClick = () => {
    alert(`Added "${movie.title}" to watchlist! 🎬`);
  };

  return (
    <section className="max-w-7xl p-6 mx-auto">
      <div className="movie_overview">
        <div className="flex-shrink-0 w-[650px] h-[750px] overflow-hidden rounded-lg shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-fit"
          />
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <p className="text-3xl font-bold text-light-200">
            <strong className="text-yellow-500">Title: </strong>
            <span className="text-light-200 italic">{movie.title}</span>
          </p>
          <p className="text-gray-100 break-words text-wrap whitespace-normal">
            <strong> Overview: </strong> {movie.overview}
          </p>
          <p className="text-gray-400">
            <strong className="font-bold text-light-400"> Genre: </strong>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-gray-400">
            <strong className="font-bold text-light-400">
              {" "}
              Release Date:{" "}
            </strong>
            {movie.release_date}
          </p>
          <p className="text-gray-400">
            <strong className="text-yellow-500">Rating: </strong>
            {movie.vote_average}
          </p>
          <p className="text-gray-400">
            <strong className="text-light-400">Runtime: </strong>
            {movie.runtime} minutes
          </p>
          <p className="text-gray-100">
            <strong className="text-lg text-light-400">Tagline: </strong>
            <span className="italic">{movie.tagline}</span>
          </p>
          <p className="text-light-100">
            <strong className="text-light-400">Production Companies: </strong>
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
          <p className="text-light-400">
            <strong className="text-green-700">Budget: </strong>$
            {movie.budget.toLocaleString()}
          </p>
          <p>
            Homepage:{" "}
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {movie.homepage}
            </a>
          </p>
          <p>
            <strong className="text-lg">IMDb ID: {movie.imdb_id} </strong>
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              (View on IMDb)
            </a>
          </p>

          {/* ✅ Interactive Button (Only in Client Component) */}
          <div className="flex flex-grow-0 gap-4">
            <Button onClick={handleButtonClick} className="movie-overview_btn">
              Add to Watchlist
            </Button>
            <Button className="movie-overview_btn">
              Watch Trailer <PlayIcon />
            </Button>
            <div className="flex flex-row items-center text-light-200">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              Rate Movie
            </div>
          </div>
          {/* ✅ Cast List */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
              <CastList cast={movie.cast} initialVisible={5} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsClient;
