"use client"; // ✅ Must be a Client Component to fetch data

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Movie {
  movie_id: number;
  title: string;
  poster_url: string;
}

const RandomMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await fetch("/api/movies/random?top_n=5"); // ✅ Fetch random movies
        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Failed to fetch");

        setMovies(result.movies);
      } catch (err: any) {
        console.error("❌ Error fetching random movies:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovies();
  }, []);

  if (loading) return <p>Loading random movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="max-w-7xl mb-4">
      <h2 className="font-bebas-neue text-4xl text-light-100">
        Top picks for you
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <Link key={movie.movie_id} href={`/movies/${movie.movie_id}`}>
            <div className="flex flex-col items-center">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="rounded-lg shadow-lg hover:scale-105 transition"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <p className="text-light-300 text-sm mt-2 text-center">
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RandomMovies;

// import React from "react";
// import { useFetchRand } from "@/hooks/use-fetch-rand";
// import { Button } from "./ui/button";

// export const RandomMovie = () => {
//   const { data, isLoading, error } = useFetchRand();

//   const rand_movie = data?.movies || [];

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="w-full">
//       <h2 className="font-bebas-neue text-4xl text-yellow-200">
//         Top picks for you
//       </h2>
//       <ul className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mb-4 space-y-8 md:space-y-0 justify-center items-center">
//         {rand_movie.map((movie: any) => (
//           <li key={movie.movie_id}>
//             <img
//               src={movie.poster_url}
//               alt={movie.title}
//               className="rounded-lg object-cover mb-5"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RandomMovie;
