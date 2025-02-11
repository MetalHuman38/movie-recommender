import { useState, useEffect } from "react";

// Define the movie interface
interface Movie {
  id?: number;
  imdbId: string;
  movieId: number;
  title: string;
  genres: string;
  posterUrl: string;
  vote_average: number;
}

// Custom hook to fetch movies
export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Initialize state as an empty array
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/movies"); // Call the API
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        if (data.success && data.data) {
          setMovies(data.data); // Update state with movie data
        } else {
          throw new Error(data.message || "No movies found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading state is cleared
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures this runs once on mount

  return { movies, loading, error };
};
