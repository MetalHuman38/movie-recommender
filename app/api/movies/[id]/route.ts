import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { coreLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
  try {
    const movieId = params.movieId;

    console.log("🔍 Received movieId from URL:", movieId); // ✅ Log input

    if (!movieId) {
      console.error("❌ Missing movieId in request");
      return NextResponse.json({ success: false, message: "movieId is required." }, { status: 400 });
    }

    // 🔹 Fetch `tmdbId` and `imdbId` from database
    const result = await db
      .select({ tmdbId: coreLinks.tmdbId, imdbId: coreLinks.imdbId })
      .from(coreLinks)
      .where(eq(coreLinks.movieId, Number(movieId)))
      .limit(1)
      .execute();

    console.log("🔍 Database Query Result:", result); // ✅ Log database response

    if (!result || result.length === 0) {
      console.error("❌ Movie not found in database for movieId:", movieId);
      return NextResponse.json({ success: false, message: "Movie not found in database." }, { status: 404 });
    }

    const { tmdbId, imdbId } = result[0];

    console.log("✅ Found tmdbId:", tmdbId, "and imdbId:", imdbId); // ✅ Log retrieved IDs

    // 🔹 Fetch metadata from TMDb API
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
    const baseUrl = "https://api.themoviedb.org/3";
    const tmdbResponse = await fetch(`${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`);

    if (!tmdbResponse.ok) {
      throw new Error(`Failed to fetch movie metadata from TMDb. Status: ${tmdbResponse.status}`);
    }

    const metadata = await tmdbResponse.json();

    console.log("✅ Successfully fetched metadata from TMDb:", metadata.title); // ✅ Log fetched metadata

    return NextResponse.json({ success: true, data: { ...metadata, imdbId } });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
