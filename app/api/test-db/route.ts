import { NextResponse } from "next/server";
import { Pool } from "pg";
import dbenv from "@/loader/env/dbenv";

// Configure PostgreSQL connection
const pool = new Pool({
  user: dbenv.DB_USER,
  host: dbenv.DB_HOST,
  database: dbenv.DB_NAME,
  password: dbenv.DB_PASS,
  port: dbenv.DB_PORT,
  ssl: false,
});

export async function GET() {
  try {
    // Test connection
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() AS current_time");
    // await syncModels(true);
    client.release();

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
