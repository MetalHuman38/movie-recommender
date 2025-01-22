"use client";

import React from "react";
import { useMovies } from "@/hooks/use-movies";
import { usePosters } from "@/hooks/use-posters";

const Movies = () => {
  const { movies, loading, error } = useMovies();
  const { posters } = usePosters();

  console.log("Posters:", posters);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movie_id}>
            {/* Add the poster image */}
            <img
              src={
                posters.find((poster) => poster.movie_id === movie.movie_id)
                  ?.poster || "/images/poster_url.webp"
              }
              alt={movie.title}
              style={{ width: "50px", height: "75px", objectFit: "cover" }}
            />
            <strong>{movie.title}</strong> - {movie.genres}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
