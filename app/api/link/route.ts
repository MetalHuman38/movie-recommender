import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { links } from "@/db/schema";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const result = await drizzledb.select().from(links).limit(20).execute();
    if (!result) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch data from the database.",
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Data fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to the database.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
