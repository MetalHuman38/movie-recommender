import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "../../../axiosConfig";

export async function GET(
  req: NextRequest,
  { params }: { params: { model: string } }
) {
  try {
    const { model } = params; // Extract the dynamic part of the route (e.g., "random" or "recommendation")

    // Build the API path based on the dynamic route
    let apiPath = `/api/${model}`;
    let queryParams = {};

    // Handle specific routes differently if needed
    if (model === "recommendations") {
      const { searchParams } = new URL(req.url);
      const movie_id = searchParams.get("movie_id") || 1;
      const topN = searchParams.get("top_n") || 10;
      queryParams = { movie_id, top_n: topN };
    }

    // Make the request to the Flask API
    const response = await axiosInstance.get(apiPath, { params: queryParams });

    // Return the response as JSON
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(`Error fetching ${params.model}:`, error.message);
    return NextResponse.json(
      { error: `Failed to fetch data from ${params.model}` },
      { status: 500 }
    );
  }
}
