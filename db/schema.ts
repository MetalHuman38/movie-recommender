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
  doublePrecision, // FIXED: Added numeric type
} from "drizzle-orm/pg-core";

// Define movies table
export const movies = pgTable("movies", {
  movieId: integer("movie_id").notNull().primaryKey(),
  title: text("title").notNull(),
  genres: text("genres").notNull(),
  releaseDate: date("release_date"),
  posterUrl: text("poster_url"),
  description: text("description"),
  voteAverage: doublePrecision("vote_average"), // Matches PostgreSQL double precision
  links: text("links"), // Matches PostgreSQL text type
});

// Define links table
export const links = pgTable("links", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  movie_id: integer("movie_id").notNull().primaryKey(), // Movie ID
  imdb_id: integer("imdb_id").notNull(), // IMDb ID
  tmdb_id: numeric("tmdb_id").notNull(), // FIXED: Changed from integer()
});
