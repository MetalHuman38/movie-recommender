CREATE TYPE "public"."genre" AS ENUM(
	'Action',
	'Adventure',
	'Animation',
	'Biography',
	'Comedy',
	'Crime',
	'Documentary',
	'Drama',
	'Family',
	'Fantasy',
	'Film-Noir',
	'History',
	'Horror',
	'Music',
	'Musical',
	'Mystery',
	'Romance',
	'Sci-Fi',
	'Sport',
	'Thriller',
	'War',
	'Western'
);
--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'superadmin');
--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'banned');
--> statement-breakpoint
CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"imdb_id" integer NOT NULL,
	"tmdb_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"genres" "genre" NOT NULL,
	"user" varchar(255),
	"imdb_id" varchar(255) NOT NULL,
	"tmdb_id" varchar(255) NOT NULL,
	"poster_url" text NOT NULL,
	"description" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"rating" integer NOT NULL,
	"genre" varchar(255) NOT NULL,
	"director" varchar(255) NOT NULL,
	"plot" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "registrations_id_unique" UNIQUE("id"),
	CONSTRAINT "registrations_username_unique" UNIQUE("username"),
	CONSTRAINT "registrations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"tag" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"reset_password_token" text,
	"reset_password_expires" timestamp,
	"status" "status" DEFAULT 'active',
	"bio" text DEFAULT 'The world is yours for the taking',
	"joined_date" date DEFAULT now(),
	"last_login" date DEFAULT now(),
	"last_logout" date DEFAULT now(),
	"last_activity" date DEFAULT now(),
	"role" "role" DEFAULT 'user',
	"avatar_url" text,
	"profile_picture" text,
	"user_registration_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "links"
ADD CONSTRAINT "links_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "ratings"
ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "ratings"
ADD CONSTRAINT "ratings_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "tags"
ADD CONSTRAINT "tags_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "tags"
ADD CONSTRAINT "tags_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "users"
ADD CONSTRAINT "users_user_registration_id_registrations_id_fk" FOREIGN KEY ("user_registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;