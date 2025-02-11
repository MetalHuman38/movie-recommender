import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle"; // ✅ Import Drizzle DB instance
import { sql } from "drizzle-orm"; // ✅ Needed for raw SQL queries

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(req: NextRequest) {
  try {
    // ✅ Parse query parameter `top_n` (default: 10)
    const url = new URL(req.url);
    const top_n = Number(url.searchParams.get("top_n")) || 10;

    // ✅ Fetch `top_n` random movies using ORDER BY RANDOM()
    const movies = await db.execute(
      sql`SELECT * FROM core_movie ORDER BY RANDOM() LIMIT ${top_n};`
    );

    if (!movies || movies.rows.length === 0) {
      return NextResponse.json({ error: "No movies found" }, { status: 404 });
    }

    // ✅ Fetch Posters from TMDb API
    const random_movies = await Promise.all(
      movies.rows.map(async (movie: any) => {
        const posterUrl = movie.tmdb_id ? await getPosterFromTMDb(movie.tmdb_id) : "";
        return { ...movie, poster_url: posterUrl };
      })
    );

    return NextResponse.json({ movies: random_movies });
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * 🔹 Fetch Real Poster from TMDb API
 * @param {number} tmdbId - TMDb Movie ID
 * @returns {Promise<string>} - Returns poster URL or empty string if not found
 */
async function getPosterFromTMDb(tmdbId: number): Promise<string> {
  if (!tmdbId) return ""; // ❌ If no TMDb ID, return empty string

  const apiUrl = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" }); // ✅ Prevents caching stale data
    if (!response.ok) throw new Error(`Failed to fetch TMDb movie ${tmdbId}`);

    const data = await response.json();

    return data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : ""; // ✅ Handle missing posters
  } catch (error) {
    console.error(`❌ Failed to fetch poster for TMDb ID ${tmdbId}:`, error);
    return ""; // ✅ Return empty if an error occurs
  }
}