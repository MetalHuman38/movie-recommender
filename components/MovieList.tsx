"use client";
import React from "react";
import Posters from "./Posters";
import MovieCard from "./MovieCard";

const MovieList = () => {
  return (
    <section className="w-full">
      <h2 className="font-bebas-neue text-4xl text-light-100">
        Explore Popular Movies
      </h2>
      <Posters />
    </section>
  );
};

export default MovieList;
