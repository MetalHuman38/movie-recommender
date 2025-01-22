import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const fetchCSV = async (url: string): Promise<any[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV from ${url}`);
  }

  const text = await response.text();
  const rows = text.split("\n").map((row) => row.split(","));
  const headers = rows.shift(); // First row as headers
  return rows.map((row) =>
    headers?.reduce(
      (acc, header, index) => {
        acc[header.trim()] = row[index].trim();
        return acc;
      },
      {} as Record<string, string>
    )
  );
};

export const loadData = async () => {
  const movies = await fetchCSV(
    "/home/babsdevsys/movie_recommendations/public/data/movies_clean.csv"
  );
  const ratings = await fetchCSV(
    "/home/babsdevsys/movie_recommendations/public/data/ratings_clean.csv"
  );
  const tags = await fetchCSV(
    "/home/babsdevsys/movie_recommendations/public/data/tags_clean.csv"
  );
  const links = await fetchCSV(
    "/home/babsdevsys/movie_recommendations/public/data/links_clean.csv"
  );

  return { movies, ratings, tags, links };
};

export const fetchMoviePosters = async (movieIds: number[]) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  try {
    const posters = await Promise.all(
      movieIds.map(async (id) => {
        const response = await fetch(
          `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        if (response.ok) {
          const data = await response.json();
          return {
            id,
            title: data.title,
            poster: `${imageUrl}${data.poster_path}`,
            year: new Date(data.release_date).getFullYear(),
            rating: data.vote_average,
            actors:
              data.credits?.cast?.map(
                (actor: { name: string }) => actor.name
              ) || [],
            director:
              data.credits?.crew?.find(
                (crew: { job: string }) => crew.job === "Director"
              )?.name || "",
            description: data.overview,
            genre:
              data.genres
                ?.map((genre: { name: string }) => genre.name)
                .join(", ") || "",
            trailer: `https://www.youtube.com/watch?v=${data.videos?.results?.[0]?.key || ""}`,
            runtime: data.runtime,
            imdbID: data.imdb_id,
            imdbRating: data.vote_average,
            imdbVotes: data.vote_count,
            metascore: data.vote_average * 10,
            type: "movie",
            response: true,
            error: "",
            country:
              data.production_countries
                ?.map((country: { name: string }) => country.name)
                .join(", ") || "",
          };
        }
        return null;
      })
    );

    return posters.filter((movie): movie is IMovies => movie !== null); // Filter out null results
  } catch (error) {
    console.error("Error fetching movie posters:", error);
    return [];
  }
};

// custom function to fetch data from the database
export const fetchMovies = async () => {
  const response = await fetch("/api/movies");
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};

// custom function to fetch data from the database
export const fetchRatings = async () => {
  const response = await fetch("/api/ratings");
  if (!response.ok) {
    throw new Error("Failed to fetch ratings");
  }
  return response.json();
};

// custom function to fetch data from the database
export const fetchTags = async () => {
  const response = await fetch("/api/tags");
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  return response.json();
};

// custom function to fetch data from the database
export const fetchLinks = async () => {
  const response = await fetch("/api/links");
  if (!response.ok) {
    throw new Error("Failed to fetch links");
  }
  return response.json();
};
