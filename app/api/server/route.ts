import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../axiosConfig";

export async function GET(req: NextRequest) {
  try {
    // Get query parameters from the incoming request
    const { searchParams } = new URL(req.url);
    const movie_id = searchParams.get("movie_id") || 1;
    const topN = searchParams.get("top_n") || 10;

    // Make the request to the Flask server
    const response = await axiosInstance.get(
      "/api/recommendations?movie_id=1&top_n=20",
      {
        params: { movie_id: movie_id, top_n: topN },
      }
    );

    // Return the response as JSON
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching recommendations:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch recommendations from routes" },
      { status: 500 }
    );
  }
}
