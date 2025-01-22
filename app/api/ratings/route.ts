import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error("LOCAL_DB_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DB_URL,
});

export async function GET(req: NextRequest) {
  try {
    // Test database connection
    const client = await pool.connect();
    try {
      // Query to fetch data
      const result = await client.query("SELECT * FROM ratings LIMIT 10;");
      return NextResponse.json({
        success: true,
        message: "Database connection successful!",
        data: result.rows,
      });
    } finally {
      client.release(); // Release the connection back to the pool
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
