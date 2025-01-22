"use client";

import React from "react";
import { usePosters } from "@/hooks/use-posters";

const MoviePosters = () => {
  const { posters, loading, error } = usePosters();

  if (loading) return <p>Loading posters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Movie Posters</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {posters.map((poster) => (
          <div key={poster.movie_id} style={{ textAlign: "center" }}>
            <img
              src={poster.poster}
              alt={poster.title}
              style={{ width: "200px", height: "300px", objectFit: "cover" }}
            />
            <h3>{poster.title}</h3>
            <p>{poster.genres}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePosters;
