import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { sql } from "drizzle-orm";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_POSTER = "https://via.placeholder.com/500x750?text=No+Image"; // ✅ Fallback Poster

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const top_n = Number(url.searchParams.get("top_n")) || 50;

    console.log(`🔍 Fetching ${top_n} random movies...`);

    // ✅ Fetch random movies from database
    const movies = await drizzledb.execute(
      sql`SELECT * FROM core_movie ORDER BY RANDOM() LIMIT ${top_n};`
    );

    if (!movies || movies.rows.length === 0) {
      return NextResponse.json({ error: "No movies found" }, { status: 404 });
    }

    // ✅ Use Database Poster First, Fetch Rating Separately
    const moviesWithRatings = await Promise.all(
      movies.rows.map(async (movie: any) => {
        // ✅ Use DB poster first, only fetch if missing
        const posterUrl =
          movie.poster_url && movie.poster_url.trim() !== ""
            ? movie.poster_url
            : movie.tmdb_id
              ? await getPosterFromTMDb(movie.tmdb_id) // 🔹 Fetch if missing
              : DEFAULT_POSTER;

        const averageRating = await getMovieRating(movie.tmdb_id, movie.imdb_id);
        return { ...movie, poster_url: posterUrl, average_rating: averageRating };
      })
    );

    return NextResponse.json({ movies: moviesWithRatings });
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * 🔹 Fetch Poster from TMDb **ONLY IF Missing in DB**
 */
async function getPosterFromTMDb(tmdbId: number): Promise<string> {
  if (!tmdbId) return DEFAULT_POSTER;

  const apiUrl = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      console.warn(`⚠️ TMDb request failed for ID ${tmdbId}: ${response.status}`);
      return DEFAULT_POSTER; // ✅ Don't stall, return placeholder
    }

    const data = await response.json();
    return data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : DEFAULT_POSTER;
  } catch (error) {
    console.error(`❌ Failed to fetch poster for TMDb ID ${tmdbId}:`, error);
    return DEFAULT_POSTER; // ✅ Final fallback
  }
}

/**
 * 🔹 Fetch Movie Rating (Check DB First, then TMDb API)
 */
async function getMovieRating(tmdbId: number | null, imdbId: number | null): Promise<number> {
  if (!tmdbId && !imdbId) return 0;

  try {
    // ✅ First, check local database for an average rating
    const ratingResult = await drizzledb.execute(
      sql`SELECT AVG(rating) as avg_rating FROM core_ratings WHERE movie_id = ${tmdbId};`
    );

    if (ratingResult.rows.length > 0 && ratingResult.rows[0].avg_rating !== null) {
      const avgRating = Number(ratingResult.rows[0].avg_rating);
      return isNaN(avgRating) ? 0 : parseFloat(avgRating.toFixed(1));
    }

    // ✅ If no local rating, fetch from TMDb API
    if (tmdbId) {
      const apiUrl = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

      try {
        const response = await fetch(apiUrl, { cache: "no-store" });

        if (!response.ok) {
          console.warn(`⚠️ TMDb rating request failed for ID ${tmdbId}: ${response.status}`);
          return 0; // ✅ Fallback to zero rating
        }

        const data = await response.json();
        return data.vote_average ? parseFloat(data.vote_average.toFixed(1)) : 0;
      } catch (error) {
        console.error(`❌ Failed to fetch rating for TMDb ID ${tmdbId}:`, error);
        return 0;
      }
    }

    return 0; // No rating found
  } catch (error) {
    console.error(`❌ Error fetching rating for movie ${tmdbId || imdbId}:`, error);
    return 0;
  }
}
