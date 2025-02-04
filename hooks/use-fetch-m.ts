import { useState, useEffect } from "react";
import axiosInstance from "@/axiosConfig";

interface Poster {
  movie_id: number;
  tmdb_id: string;
  poster: string; // URL of the poster
  title?: string;
  genres?: string[];
  metadata?: any; // Store full metadata from TMDB API
}

export const useFetchModel = (tmdb_id: string | null) => {
  const [model, setModel] = useState<Poster | null>(null);

  useEffect(() => {
    if (!tmdb_id) {
      // If no tmdbId is provided, use a fallback poster
      setModel({
        movie_id: 0,
        tmdb_id: "placeholder",
        poster: "/fallback-poster.png",
        title: "No recent search",
        genres: [],
        metadata: null,
      });
      return;
    }

    const fetchModel = async () => {
      try {
        const response = await axiosInstance.get(`/movie/${tmdb_id}`);

        if (response.status === 200) {
          const tmdbData = response.data;
          setModel({
            movie_id: 0,
            tmdb_id,
            poster: tmdbData.poster_path
              ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
              : "/fallback-poster.png",
            title: tmdbData.title || "Unknown Title",
            genres: tmdbData.genres?.map((genre: any) => genre.name) || [],
            metadata: tmdbData,
          });
        }
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchModel();
  }, [tmdb_id]);
};

export default useFetchModel;
