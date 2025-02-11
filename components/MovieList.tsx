"use client";
import React from "react";
import Movies from "./Movies";

const MovieList = () => {
  return (
    <section className="w-full mt-10">
      <h2 className="font-bebas-neue text-4xl items-center text-light-100">
        Explore Popular Movies
      </h2>
      <Movies
        imdbId="123"
        title="Movie Title"
        posterUrl="https://example.com/poster.jpg"
      />
    </section>
  );
};

export default MovieList;
