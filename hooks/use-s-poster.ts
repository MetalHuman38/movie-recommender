import { useState, useEffect } from "react";

// Define the poster interface
interface Poster {
  tmdb_id: string;
  poster: string; // URL of the poster
  title?: string;
  genres?: string[];
  metadata?: any; // Store full metadata from TMDB API
}

export const usePoster = (tmdb_id: string | null) => {
  const [poster, setPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tmdb_id) {
      // If no tmdbId is provided, use a fallback poster
      setPoster({
        tmdb_id: "placeholder",
        poster: "/fallback-poster.png",
        title: "No recent search",
        genres: [],
        metadata: null,
      });
      setLoading(false);
      return;
    }

    const fetchPoster = async () => {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
      const baseUrl = "https://api.themoviedb.org/3";
      const imageUrl = "https://image.tmdb.org/t/p/w500";

      try {
        const response = await fetch(
          `${baseUrl}/movie/${tmdb_id}?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch TMDB data");
        }

        const tmdbData = await response.json();
        setPoster({
          tmdb_id,
          poster: tmdbData.poster_path
            ? `${imageUrl}${tmdbData.poster_path}`
            : "/fallback-poster.png",
          title: tmdbData.title || "Unknown Title",
          genres: tmdbData.genres?.map((genre: any) => genre.name) || [],
          metadata: tmdbData,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [tmdb_id]);

  return { poster, loading, error };
};
