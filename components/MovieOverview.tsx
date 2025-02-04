"use client";
import React from "react";
import { usePosters } from "@/hooks/use-posters";
import RandomMovie from "./RandomMovies";

const MovieOverview = () => {
  const { posters, loading, error } = usePosters();

  console.log("Poster:", posters);

  if (loading) return <p>Loading poster...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!posters || posters.length === 0) return <p>No posters available.</p>;

  // Example: Selecting the first poster for the overview
  const selectedPoster = posters[5] || posters[0];
  console.log("Selected Poster:", selectedPoster);

  return (
    <section className="w-full">
      <div className="">
        <RandomMovie />
      </div>
    </section>
  );
};

export default MovieOverview;
