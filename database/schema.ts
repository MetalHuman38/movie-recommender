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
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// PostgreSQL connection setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export const STATUS_ENUM = pgEnum("status", ["active", "inactive", "banned"]);
export const ROLE_ENUM = pgEnum("role", ["user", "admin", "superadmin"]);
export const GENRE_ENUM = pgEnum("genre", ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"]);

// Define the Registrations table schema
export const registrations = pgTable("registrations", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(), // Primary key
  fullName: varchar("full_name").notNull(), // Full name column
  username: varchar("username").notNull().unique(), // Unique username
  email: text("email")
    .notNull()
    .unique(), // Unique email
  password: text("password").notNull(), // Password column
  createdAt: timestamp("created_at").notNull().defaultNow(), // Default to now
});

// Infer types for inserting and selecting rows
export type InsertRegistration = typeof registrations.$inferInsert;
export type SelectRegistration = typeof registrations.$inferSelect;

// Define the Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires"),
  status: STATUS_ENUM("status").default("active"),
  bio: text("bio").default("The world is yours for the taking"),
  joinedDate: date("joined_date").defaultNow(),
  lastLogin: date("last_login").defaultNow(),
  lastLogout: date("last_logout").defaultNow(),
  lastActivity: date("last_activity").defaultNow(),
  role: ROLE_ENUM("role").default("user"),
  avatarUrl: text("avatar_url"),
  profilePicture: text("profile_picture"),
  userRegistrationId: uuid("user_registration_id")
    .notNull()
    .references(() => registrations.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Infer types for inserting and selecting rows
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// Define the Movies table schema
export const movies = pgTable("movies", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  movieId: integer("movie_id").notNull(), // Movie identifier
  genres: GENRE_ENUM("genres").notNull(), // Genres
  user: varchar("user", { length: 255 }), // User associated with the movie
  imdbId: varchar("imdb_id", { length: 255 }).notNull(), // IMDb identifier
  tmdbId: varchar("tmdb_id", { length: 255 }).notNull(), // TMDb identifier
  posterUrl: text("poster_url").notNull(), // URL for the poster
  description: text("description").notNull(), // Movie description
  title: varchar("title", { length: 255 }).notNull(), // Movie title
  year: integer("year").notNull(), // Release year
  rating: integer("rating").notNull(), // Rating (integer for simplicity)
  genre: varchar("genre", { length: 255 }).notNull(), // Primary genre
  director: varchar("director", { length: 255 }).notNull(), // Movie director
  plot: text("plot").notNull(), // Plot description
  createdAt: timestamp("created_at").notNull().defaultNow(), // Auto-set creation timestamp
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // Auto-set update timestamp
});

// Infer types for inserting and selecting rows
export type InsertMovie = typeof movies.$inferInsert;
export type SelectMovie = typeof movies.$inferSelect;

// Define the Links table schema
export const links = pgTable("links", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }), // Foreign key to Movies table
  imdbId: integer("imdb_id").notNull(), // IMDb ID
  tmdbId: integer("tmdb_id").notNull(), // TMDb ID
  createdAt: timestamp("created_at").notNull().defaultNow(), // Creation timestamp
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // Update timestamp
});

// Infer types for inserting and selecting rows
export type InsertLink = typeof links.$inferInsert;
export type SelectLink = typeof links.$inferSelect;

// Define the Ratings table schema
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Foreign key to Users table
  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }), // Foreign key to Movies table
  timestamp: timestamp("timestamp").notNull(), // Timestamp of the rating
  rating: integer("rating").notNull(), // Rating value
  createdAt: timestamp("created_at").notNull().defaultNow(), // Creation timestamp
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // Update timestamp
});

// Infer types for inserting and selecting rows
export type InsertRating = typeof ratings.$inferInsert;
export type SelectRating = typeof ratings.$inferSelect;

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Foreign key referencing Users table
  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }), // Foreign key referencing Movies table
  tag: text("tag").notNull(), // Tag name
  timestamp: timestamp("timestamp").notNull(), // Tagging timestamp
  createdAt: timestamp("created_at").notNull().defaultNow(), // Auto-set creation timestamp
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // Auto-set update timestamp
});

// Infer types for inserting and selecting rows
export type InsertTag = typeof tags.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;

