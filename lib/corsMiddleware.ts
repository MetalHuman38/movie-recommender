import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = NextResponse.json({
    message: "CORS enabled for Next.js API",
  });

  // Set CORS headers manually
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://movie-recommender-fo9ndjxvh-babatunde-kalejaiyes-projects.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });

  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://movie-recommender-fo9ndjxvh-babatunde-kalejaiyes-projects.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
