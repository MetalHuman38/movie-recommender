import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error("LOCAL_DB_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DB_URL,
});

console.log("Connected to database");

export const db = drizzle(pool);
