"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Movie {
  movie_id: number;
  title: string;
  poster_url: string;
  vote_average: number;
  genres: string[];
  release_date: string;
  overview: string;
}

export const SearchedMovies = () => {
  const router = useRouter();
  const { search } = router.query;

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !search) return; // ✅ Ensure router is ready

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        console.log(`🔍 Fetching search results for: ${search}`);
        const response = await fetch(`/api/search?query=${search}`);
        console.log("🔍 Response from app/api:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        console.log("✅ API Response:", data);

        if (data.movies) {
          setSearchResults(data.movies);
        } else {
          setSearchResults([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [router.isReady, search]); // ✅ Added router.isReady

  return (
    <div className="p-6">
      {loading && <p className="text-white">Loading search results...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchResults.map((movie) => (
            <div key={movie.movie_id} className="bg-gray-900 p-4 rounded-lg">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <h2 className="text-xl font-bold text-yellow-300 mt-2">
                {movie.title}
              </h2>
              <p className="text-gray-400">⭐ {movie.vote_average}/10</p>
              <p className="text-gray-400">🎭 {movie.genres.join(", ")}</p>
              <p className="text-gray-500">📅 {movie.release_date}</p>
              <p className="text-gray-300 mt-2">{movie.overview}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-white">No results found.</p>
      )}
    </div>
  );
};

export default SearchedMovies;
