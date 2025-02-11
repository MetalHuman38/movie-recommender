import React from "react";
import { db } from "@/database/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";
import MovieDetailsClient from "@/components/MovieDetailsClient";

interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  cast: CastMember[];
}

const MovieDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params)?.id; // ✅ This is movieId
  if (!params || !id) {
    console.error("❌ No movie ID provided.");
    return <p>Movie not found.</p>;
  }

  console.log("🔍 Fetching movie details for movieId:", id);

  // 🔹 Fetch `tmdbId` from database using `movieId`
  const result = await db
    .select({ tmdbId: coreMovie.tmdbId })
    .from(coreMovie)
    .where(eq(coreMovie.movieId, Number(id)))
    .limit(1)
    .execute();

  console.log("🔍 Database Query Result:", result);

  if (!result || result.length === 0) {
    console.error("❌ No tmdbId found for movieId:", id);
    return <p>Movie not found.</p>;
  }

  const { tmdbId } = result[0];

  // 🔹 Fetch metadata from TMDb API
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";
  const response = await fetch(
    `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`
  );

  if (!response.ok) {
    console.error("❌ Failed to fetch movie metadata.");
    return <p>Movie data unavailable.</p>;
  }

  const movie: Movie = await response.json();
  console.log("✅ Movie data fetched:", movie.title);

  // return <MovieDetailsClient movie={movie} />;
  return (
    <>
      <MovieDetailsClient movie={movie} />;
    </>
  );
};

export default MovieDetails;
