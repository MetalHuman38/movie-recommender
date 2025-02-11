CREATE TABLE "core_links" (
	"id" bigint PRIMARY KEY NOT NULL,
	"imdb_id" integer NOT NULL,
	"tmdb_id" double precision NOT NULL,
	"movie_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "core_movie" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"genres" varchar(255) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"description" text,
	"imdb_id" integer,
	"tmdb_id" double precision,
	"user_id" integer NOT NULL,
	"poster_url" varchar(200),
	CONSTRAINT "core_movie_movie_id_unique" UNIQUE("movie_id")
);
--> statement-breakpoint
CREATE TABLE "core_ratings" (
	"id" bigint PRIMARY KEY NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"movie_id" integer NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "core_ratings_user_id_movie_id_unique" UNIQUE("user_id","movie_id")
);
--> statement-breakpoint
CREATE TABLE "core_tags" (
	"id" bigint PRIMARY KEY NOT NULL,
	"tag" varchar(255) NOT NULL,
	"timestamp" timestamp with time zone,
	"movie_id" integer NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "core_tags_user_id_movie_id_unique" UNIQUE("user_id","movie_id")
);
--> statement-breakpoint
CREATE TABLE "core_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" varchar(128) NOT NULL,
	"last_login" timestamp with time zone,
	"is_superuser" boolean DEFAULT false,
	"email" varchar(255) NOT NULL,
	"name" varchar(100),
	"is_active" boolean DEFAULT true,
	"is_staff" boolean DEFAULT false,
	"image" varchar(255),
	CONSTRAINT "core_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "core_links" ADD CONSTRAINT "core_links_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_movie" ADD CONSTRAINT "core_movie_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_ratings" ADD CONSTRAINT "core_ratings_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_ratings" ADD CONSTRAINT "core_ratings_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_tags" ADD CONSTRAINT "core_tags_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_tags" ADD CONSTRAINT "core_tags_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;