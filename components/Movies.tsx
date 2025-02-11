"use client";

import React from "react";
import { useMovies } from "@/hooks/use-movies";
import Link from "next/link";

interface PostersProps {
  imdbId: string;
  title: string;
  posterUrl: string;
  vote_average?: number;
}

const Movies = ({ imdbId, title, posterUrl }: PostersProps) => {
  const { movies, loading, error } = useMovies();

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full">
      <ul className="grid grid-cols-4 lg:grid-cols-6 md:grid-cols-4 gap-8 p-4">
        {movies.map((movie) => (
          <Link
            href={`/movies/imdb/${movie.imdbId}`}
            key={movie.movieId}
            className="w-full flex flex-col items-center justify-center rounded-lg"
          >
            <li className="w-full rounded-2xl">
              {/* Add the poster image */}
              <img
                src={
                  movie.posterUrl ||
                  "https://via.placeholder.com/150x225?text=No+Poster"
                }
                alt={movie.title}
                style={{ width: "350px", height: "400px%", objectFit: "cover" }}
                className="rounded-lg"
              />
              <div className="w-full">
                <p className="text-light-300 text-lg font-semibold">
                  <strong>{movie.title}</strong>
                </p>
                <p className="text-light-300 text-lg font-semibold">
                  <strong>Genres:</strong> {movie.genres}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Movies;
