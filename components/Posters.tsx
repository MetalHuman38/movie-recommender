"use client";

import React from "react";
import { usePosters } from "@/hooks/use-posters";
import Link from "next/link";

export const MoviePosters = () => {
  const { posters, loading, error } = usePosters();

  if (loading) return <p>Loading posters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul className="movie-list">
        {posters.map((poster) => (
          <Link href={`/movies/${poster.tmdb_id}`} key={poster.movie_id}>
            <li style={{ textAlign: "center" }}>
              <img
                src={poster.poster}
                alt={`Poster for movie ID ${poster.movie_id}`}
                style={{
                  width: "150px",
                  height: "225px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MoviePosters;
