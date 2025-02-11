import type { NextRequest, NextResponse } from "next/server";



// ✅ Define TMDb API Key & Base URL
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * 🔹 Fetch metadata & poster from TMDb API
 * @param {number} tmdbId - TMDb Movie ID
 * @returns {Promise<{posterUrl: string, metadata: any}>} - Returns movie metadata & poster URL
 */
async function fetchMovieFromTMDb(tmdbId: number): Promise<{ posterUrl: string; metadata: any }> {
  if (!tmdbId) return { posterUrl: "", metadata: null }; // ❌ Handle missing TMDb ID

  const apiUrl = `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" }); // ✅ Prevents caching stale data
    if (!response.ok) throw new Error(`Failed to fetch movie ${tmdbId}`);

    const data = await response.json();

    // ✅ Extract Poster URL & Handle Missing Posters
    const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "";

    return { posterUrl, metadata: data };
  } catch (error) {
    console.error(`❌ Error fetching TMDb movie (${tmdbId}):`, error);
    return { posterUrl: "", metadata: null }; // Return empty values if error
  }
}
