// Define the schema for the database
import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error("LOCAL_DB_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DB_URL,
});

const db = drizzle(pool);

export const ADMIN_ROLE_ENUM = pgEnum("role", ["admin", "superadmin"]);

export const GENRE_ENUM = pgEnum("genre", [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
]);

// Define Admin table schema
export const admin = pgTable("admin", {
  id: serial("id").notNull().primaryKey().unique(),
  username: varchar("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: ADMIN_ROLE_ENUM("role").default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Infer types for inserting and selecting rows
export type InsertAdmin = typeof admin.$inferInsert;
export type SelectAdmin = typeof admin.$inferSelect;

// Define the Movies table schema
export const movies = pgTable("movies", {
  id: serial("id").notNull().primaryKey().unique(),
  title: varchar("title").notNull(),
  genre: GENRE_ENUM("genre").notNull(),
  releaseDate: timestamp("release_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export default db;
