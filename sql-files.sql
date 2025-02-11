-- Switch to the new database
\c movie_recommendation

CREATE TABLE core_user (
    id SERIAL PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    last_login TIMESTAMPTZ DEFAULT NULL,
    is_superuser BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    image VARCHAR(255) DEFAULT NULL
);


CREATE TABLE core_movie (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    genres VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    description TEXT,
    imdb_id BIGINT,
    tmdb_id DOUBLE PRECISION,
    user_id BIGINT NOT NULL,
    poster_url VARCHAR(200),
    CONSTRAINT core_movie_user_id_fk FOREIGN KEY (user_id) REFERENCES core_user(id) DEFERRABLE INITIALLY DEFERRED
);

-- Create the core_ratings table
CREATE TABLE core_ratings (
    id BIGSERIAL PRIMARY KEY,
    rating NUMERIC(2,1) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    movie_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT core_ratings_movie_id_fk FOREIGN KEY (movie_id) REFERENCES core_movie(movie_id) DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT core_ratings_user_id_fk FOREIGN KEY (user_id) REFERENCES core_user(id) DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT core_ratings_unique UNIQUE (user_id, movie_id)
);

-- Create the core_links table
CREATE TABLE core_links (
    id BIGSERIAL PRIMARY KEY,
    imdb_id INTEGER NOT NULL,
    tmdb_id DOUBLE PRECISION NOT NULL,
    movie_id INTEGER NOT NULL,
    CONSTRAINT core_links_movie_id_fk FOREIGN KEY (movie_id) REFERENCES core_movie(movie_id) DEFERRABLE INITIALLY DEFERRED
);

-- Create the core_tags table
CREATE TABLE core_tags (
    id BIGSERIAL PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ,
    movie_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT core_tags_movie_id_fk FOREIGN KEY (movie_id) REFERENCES core_movie(movie_id) DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT core_tags_user_id_fk FOREIGN KEY (user_id) REFERENCES core_user(id) DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT core_tags_unique UNIQUE (user_id, movie_id)
);
