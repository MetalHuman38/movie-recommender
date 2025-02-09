import Cors from "next-cors";
import { NextRequest, NextResponse } from "next/server";

export async function corsMiddleware(req: NextRequest, res: NextResponse) {
  await Cors(req, res);
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://movie-recommender-fo9ndjxvh-babatunde-kalejaiyes-projects.vercel.app"
  );
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.headers.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
