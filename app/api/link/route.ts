import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const imdbId = url.searchParams.get("imdbId");

    if (!imdbId) {
      return NextResponse.json({ success: false, message: "imdbId is required." }, { status: 400 });
    }

    // Fetch the corresponding tmdbId from the database
    const result = await drizzledb
      .select()
      .from(coreLinks).where((eq(coreLinks.imdbId, Number(imdbId)))).limit(1).execute();
    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, message: "No data found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ success: false, message: "Database error.", error: error.message }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { drizzledb } from "@/db/drizzle";
// import { coreLinks } from "@/db/schema";

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const result = await drizzledb.select().from(coreLinks).limit(20).execute();
//     if (!result) {
//       return NextResponse.json({
//         success: false,
//         message: "Failed to fetch data from the database.",
//       });
//     } else {
//       return NextResponse.json({
//         success: true,
//         message: "Data fetched successfully!",
//         data: result,
//       });
//     }
//   } catch (error: any) {
//     console.error("Database connection error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to connect to the database.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
