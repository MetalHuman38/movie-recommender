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

// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless"; // Neon Edge-compatible client
// import { drizzle as drizzleLocal } from "drizzle-orm/node-postgres"; // For local PostgreSQL
// import { Pool } from "pg";

// if (!process.env.DATABASE_URL || !process.env.LOCAL_DB_URL) {
//   throw new Error("DATABASE_URL or LOCAL_DB_URL is not set");
// }

// let db;

// if (process.env.RUNTIME_ENV === "edge") {
//   // Use Neon Drizzle for Edge runtime
//   const sql = neon(process.env.DATABASE_URL);
//   db = drizzle(sql);
// } else {
//   // Use local PostgreSQL for server runtime
//   const pool = new Pool({
//     connectionString: process.env.LOCAL_DB_URL,
//   });
//   db = drizzleLocal(pool);
// }

// export { db };

