import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    if (!url) {
      return NextResponse.json({ success: false, message: "imdbId is required." }, { status: 400 });
    }

    // Fetch the corresponding tmdbId from the database
    const result = await db
      .select()
      .from(coreMovie).where((eq(coreMovie.imdbId, coreMovie.imdbId))).limit(20).execute();
    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, message: "No data found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ success: false, message: "Database error.", error: error.message }, { status: 500 });
  }
}
