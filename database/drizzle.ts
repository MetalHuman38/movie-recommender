// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
import { drizzle } from "drizzle-orm/neon-http"; // Use neon-http for Edge compatibility
import { neon } from "@neondatabase/serverless"; // Neon Edge-compatible client

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
