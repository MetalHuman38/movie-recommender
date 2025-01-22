import { Pool } from "pg";

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error("NEXT_PUBLIC_DB_URL is not set");
}

// Create a pool instance for PostgreSQL
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DB_URL,
});

// Utility to query the database
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    client.release();
  }
};
