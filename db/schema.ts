import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  pgEnum,
  date,
  numeric,
  doublePrecision,
  boolean,
  bigint,
  unique, // FIXED: Added numeric type
} from "drizzle-orm/pg-core";

// Define movies table
// Core User Table
export const coreUser = pgTable("core_user", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 128 }).notNull(),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  isSuperuser: boolean("is_superuser").default(false),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  isStaff: boolean("is_staff").default(false),
  image: varchar("image", { length: 255 })
});

// Core Movie Table
export const coreMovie = pgTable("core_movie", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  genres: varchar("genres", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  description: text("description"),
  imdbId: integer("imdb_id"),
  tmdbId: doublePrecision("tmdb_id"),
  userId: integer("user_id").notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  posterUrl: varchar("poster_url", { length: 200 })
});

// Core Ratings Table
export const coreRatings = pgTable("core_ratings", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  userId: bigint("user_id", { mode: "number" }).notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
}, (table) => ({
  uniqueRating: unique().on(table.userId, table.movieId) // Enforces UNIQUE(user_id, movie_id)
}));

// Core Links Table
export const coreLinks = pgTable("core_links", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  imdbId: integer("imdb_id").notNull(),
  tmdbId: doublePrecision("tmdb_id").notNull(),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
});

// Core Tags Table
export const coreTags = pgTable("core_tags", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  tag: varchar("tag", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  userId: bigint("user_id", { mode: "number" }).notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
}, (table) => ({
  uniqueTag: unique().on(table.userId, table.movieId) // Enforces UNIQUE(user_id, movie_id)
}));
