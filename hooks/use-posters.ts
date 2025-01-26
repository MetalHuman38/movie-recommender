import { useState, useEffect } from "react";

// Define the poster interface
interface usePoster {
  movie_id: number;
  tmdb_id: string;
  poster: string; // URL of the poster
  title: string;
  genres: string;
  metadata: any; // Store full metadata from TMDB API
  videos: any[]; // Store videos from TMDB API
  cast: any[]; // Store cast from TMDB API
}

export const usePosters = () => {
  const [posters, setPosters] = useState<usePoster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosters = async () => {
      setLoading(true);

      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
      const baseUrl = "https://api.themoviedb.org/3";
      const imageUrl = "https://image.tmdb.org/t/p/w500";

      try {
        // Fetch links from your API
        const response = await fetch("http://localhost:3000/api/links");
        if (!response.ok) {
          throw new Error("Failed to fetch links data");
        }

        const linksData = await response.json();
        if (linksData.success && linksData.data) {
          const links = linksData.data;

          // Fetch data from TMDB API for each `tmdb_id`
          const postersWithImages = await Promise.all(
            links.map(async (link: any) => {
              const tmdbId = link.tmdb_id.replace(".0", ""); // Clean up `tmdb_id`

              const tmdbResponse = await fetch(
                `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`
              );

              const videosResponse = await fetch(
                `${baseUrl}/movie/${tmdbId}/videos?api_key=${apiKey}&language=en-US`
              );

              // Fetch cast
              const creditsResponse = await fetch(
                `${baseUrl}/movie/${tmdbId}/credits?api_key=${apiKey}&language=en-US`
              );

              const tmdbData = tmdbResponse.ok
                ? await tmdbResponse.json()
                : null;
              const videoData = videosResponse.ok
                ? await videosResponse.json()
                : { results: [] };

              const creditsData = creditsResponse.ok
                ? await creditsResponse.json()
                : { cast: [] };

              const posterPath = tmdbData?.poster_path;
              const genres = tmdbData?.genres
                ?.map((genre: any) => genre.name)
                .join(", ");

              if (tmdbData) {
                return {
                  movie_id: link.movie_id,
                  tmdb_id: tmdbId,
                  poster: posterPath
                    ? `${imageUrl}${posterPath}`
                    : "/fallback-poster.png",
                  title: tmdbData.title,
                  genres,
                  videos: videoData.results || [],
                  cast: creditsData.cast || [],
                  metadata: tmdbData,
                };
              }

              // Fallback if TMDB call fails
              return {
                movie_id: link.movie_id,
                tmdb_id: tmdbId,
                poster: "/fallback-poster.png",
                metadata: null,
              };
            })
          );

          setPosters(postersWithImages); // Update state with posters
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
