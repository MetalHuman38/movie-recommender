import { useState, useEffect } from "react";

// Define the poster interface
interface Poster {
  movie_id: number;
  tmdb_id: string; // Note: tmdb_id is a string in your API response
  poster: string; // URL for the poster
}

export const usePosters = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosters = async () => {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
      const baseUrl = "https://api.themoviedb.org/3";
      const imageUrl = "https://image.tmdb.org/t/p/w500";

      try {
        // Fetch links with `tmdb_id` from your API
        const response = await fetch("api/links");
        if (!response.ok) {
          throw new Error("Failed to fetch links data");
        }

        const linksData = await response.json();
        if (linksData.success && linksData.data) {
          const links = linksData.data;

          // Fetch posters from TMDB for each `tmdb_id`
          const postersWithImages = await Promise.all(
            links.map(async (link: any) => {
              const tmdbId = link.tmdb_id.replace(".0", ""); // Remove any trailing `.0` from tmdb_id
              const tmdbResponse = await fetch(
                `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`
              );

              if (tmdbResponse.ok) {
                const tmdbData = await tmdbResponse.json();
                const posterPath = tmdbData.poster_path;

                return {
                  movie_id: link.movie_id,
                  tmdb_id: link.tmdb_id,
                  poster: posterPath
                    ? `${imageUrl}${posterPath}`
                    : "/fallback-poster.png",
                };
              }

              return {
                movie_id: link.movie_id,
                tmdb_id: link.tmdb_id,
                poster: "/fallback-poster.png",
              }; // Fallback if API fails
            })
          );

          setPosters(postersWithImages);
        } else {
          throw new Error(linksData.message || "No links found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  return { posters, loading, error };
};
