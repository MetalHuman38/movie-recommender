import React from "react";
import { useFetchRand } from "@/hooks/use-fetch-rand";
import { Button } from "./ui/button";

export const RandomMovie = () => {
  const { data, isLoading, error } = useFetchRand();

  const rand_movie = data?.movies || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full">
      <h2 className="font-bebas-neue text-4xl text-yellow-200">
        Top picks for you
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mb-4 space-y-8 md:space-y-0 justify-center items-center">
        {rand_movie.map((movie: any) => (
          <li key={movie.movie_id}>
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="rounded-lg object-cover mb-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomMovie;
