from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker, joinedload
from sqlalchemy import or_
from database import engine
from models import Base, Movie
from schema import MovieSchema
from lib import MovieRecommender
from utils import OpenAIClient
import requests
import os
import random

# Initialize Flask
app = Flask(__name__)

# Enable CORS (allowing frontend requests from localhost:3000)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5001"]}}) # noqa

# ✅ Create Database Tables
Base.metadata.create_all(bind=engine)

# ✅ Create a Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Initialize the MovieRecommender
movie_engine = MovieRecommender()

ai_client = OpenAIClient()


def get_poster(movie_id):
    """
    Fetch poster URL for a given TMDB ID using TMDB API.
    """

    api_key = os.getenv("NEXT_PUBLIC_TMDB_API_KEY")
    if not api_key:
        print("TMDB API key not found.")
        return {
            "poster_url": None,
            "title": None,
            "overview": None,
            "release_date": None,
            "genres": [],
            "vote_average": None,
        }
    url = f"https://api.themoviedb.org/3/movie/{int(movie_id)}?api_key={api_key}" # noqa
    params = {"api_key": api_key}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        poster_path = data.get("poster_path")
        title = data.get("title")
        overview = data.get("overview")
        release_date = data.get("release_date")
        genres = [genre["name"] for genre in data.get("genres", [])]
        vote_average = data.get("vote_average")

        # Prepare the metadata dictionary
        poster_metadata = {
            "poster_url": f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None, # noqa
            "title": title,
            "overview": overview,
            "release_date": release_date,
            "genres": genres,
            "vote_average": vote_average,
        }
        return poster_metadata
        # if poster_path:
        #     return {"poster_url": f"https://image.tmdb.org/t/p/w500{poster_path}"} # noqa
    except requests.RequestException as e:
        print(f"Error fetching poster for TMDB ID {movie_id}: {e}")
        return {
            "poster_url": None,
            "title": None,
            "overview": None,
            "release_date": None,
            "genres": [],
            "vote_average": None,
         }


@app.route("/api/recommendations", methods=["GET"])
def get_recommendations():
    """
    Endpoint to fetch recommendations for a given movie ID.
    Query Params:
    - movie_id (int): ID of the movie to base recommendations on.
    - top_n (int): Number of recommendations to return (default: 10).
    """
    movie_id = request.args.get("movie_id", type=int)
    top_n = request.args.get("top_n", default=10, type=int)

    if not movie_id:
        return jsonify({"error": "movie_id is required"}), 400
    # Limit top_n to avoid overloading memory
    top_n = max(1, min(50, top_n))

    try:
        # Ensure movies have valid poster metadata
        enriched_movies = []
        for movie in engine.movies:
            if not isinstance(movie, dict) or "movie_id" not in movie:
                continue  # Skip invalid movie dat

            poster_data = get_poster(movie["movie_id"])
            movie["poster_url"] = poster_data.get("poster_url")
            movie["title"] = poster_data.get("title", movie.get("title"))
            movie["overview"] = poster_data.get("overview")
            movie["release_date"] = poster_data.get("release_date")
            movie["genres"] = poster_data.get("genres")
            movie["vote_average"] = poster_data.get("vote_average")
            enriched_movies.append(movie)
        validated_movies = [movie for movie in enriched_movies if movie["poster_url"]] # noqa
        recommendations = movie_engine.content_based_recommendation(movie_id, top_n) # noqa
        return jsonify(recommendations, validated_movies)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/movies", methods=["GET"])
def get_movies():
    """
    Fetch all movies from the database (with optional limit).
    """
    try:
        db = SessionLocal()
        limit = request.args.get("limit", default=10, type=int)
        # ✅ Use `joinedload(Movie.links)` to eagerly load `links`
        movies = db.query(Movie).options(joinedload(Movie.links)).limit(limit).all() # noqa

        # ✅ Close session after loading data
        db.close()

        # ✅ Convert SQLAlchemy objects to dictionaries using Pydantic
        return jsonify([MovieSchema.model_validate(movie).model_dump() for movie in movies]) # noqa

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    """
    Fetch a specific movie by ID.
    """
    try:
        db = SessionLocal()
        movie = db.query(Movie).filter(Movie.movie_id == movie_id).first()
        db.close()

        if not movie:
            return jsonify({"error": "Movie not found"}), 404

        return jsonify(MovieSchema.model_validate(movie).model_dump())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/search", methods=["GET"])
def search_movies():
    """
    Search for movies by title (prioritizing exact matches).
    """
    try:
        query = request.args.get("query", "").strip()
        top_n = request.args.get("top_n", default=10, type=int)

        if not query:
            return jsonify({"error": "Query is required"}), 400

        db = SessionLocal()
        search_query = f"%{query.lower()}%"

        # ✅ Search SQLAlchemy ORM with ILIKE
        movies = db.query(Movie).filter(Movie.title.ilike(search_query)).order_by(  # noqa
            Movie.title == query,  # Exact match first
            Movie.title.asc()  # Alphabetical order
        ).limit(top_n).all()

        db.close()

        # ✅ Convert to Dictionary & Fetch Posters
        search_results = []
        for movie in movies:
            movie_dict = MovieSchema.model_validate(movie).model_dump()

            # ✅ Extract TMDB ID if available
            tmdb_id = None
            if "links" in movie_dict and movie_dict["links"]:
                tmdb_id = movie_dict["links"][0].get("tmdb_id")

            # ✅ Fetch poster details using `tmdb_id` instead of `movie_id`
            if tmdb_id:
                poster_data = get_poster(tmdb_id)
            else:
                print(f"❌ Skipping movie {movie_dict['movie_id']} (No TMDB ID)") # noqa
                continue  # Skip if no TMDB ID is found

            # ✅ Skip movies without a poster
            if not poster_data.get("poster_url"):
                print(f"❌ Skipping movie {movie_dict['movie_id']} (No Poster)")
                continue

            # ✅ Ensure `poster_data` is a dictionary before updating
            if isinstance(poster_data, dict):
                movie_dict.update(poster_data)  # ✅ Merge Poster Data
                search_results.append(movie_dict)  # ✅ Add to results
            else:
                print(f"❌ Warning: poster_data is not valid for movie_id {movie_dict['movie_id']}") # noqa

        # ✅ If no valid movies are found, return an error
        if not search_results:
            return jsonify({"error": "No movies with posters found"}), 404

        return jsonify({"movies": search_results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/random", methods=["GET"])
def get_random_movies():
    """
    Endpoint to fetch random movies.
    Query Params:
    - top_n (int): Number of random movies to return (default: 10).
    """

    top_n = request.args.get("top_n", default=10, type=int)

    try:
        db = SessionLocal()

        # ✅ Fetch all movie IDs first
        movie_ids = db.query(Movie.movie_id).all()
        movie_ids = [id[0] for id in movie_ids]

        if not movie_ids:
            return jsonify({"error": "No movies found"}), 404

        # ✅ Select `top_n` random movies
        selected_ids = random.sample(movie_ids, min(top_n, len(movie_ids)))

        # ✅ Fetch Movie Details
        movies = db.query(Movie).filter(Movie.movie_id.in_(selected_ids)).options(joinedload(Movie.links)).all() # noqa

        db.close()

        # ✅ Convert to Dictionary & Fetch Posters
        random_movies = []
        for movie in movies:
            movie_dict = MovieSchema.model_validate(movie).model_dump()

            # ✅ Ensure `movie_dict` is a valid dictionary before update
            if not isinstance(movie_dict, dict):
                print(f"❌ Error: movie_dict is not a valid dictionary! {movie_dict}") # noqa
                continue  # Skip this movie

            poster_data = get_poster(movie_dict["movie_id"])
            # ✅ Skip movies without a poster
            if not poster_data.get("poster_url"):
                print(f"❌ Skipping movie {movie_dict['movie_id']} (No Poster)")
                continue  # Skip if poster is None
            # ✅ Check if `poster_data` is a dictionary before updating
            if isinstance(poster_data, dict):
                movie_dict.update(poster_data)  # ✅ Now update works correctly
                random_movies.append(movie_dict)  # ✅ Store updated movie
            else:
                print(f"❌ Warning: poster_data is not valid for movie_id {movie_dict['movie_id']}") # noqa

        return jsonify({"movies": random_movies})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    """
    A chatbot API that recommends movies based on user input.
    """
    data = request.json
    print(f"📥 User Input: {data}")
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # ✅ Extract movie query details from OpenAI
    extracted_data = ai_client.extract_movie_query(user_message)
    print(f"🔍 Extracted Data from OpenAI: {extracted_data}")

    if "error" in extracted_data:
        return jsonify({"error": extracted_data["error"]}), 500

    query_details = {k.lower(): v for k, v in extracted_data.items()}
    print(f"🔍 Extracted Normalized Query Details: {query_details}")

    genre = query_details.get("genres", "Any")
    count = query_details.get("count", 10)

    # ✅ Fetch movie recommendations from DB
    db = SessionLocal()
    movies = db.query(Movie).filter(
        or_(*[Movie.genres.ilike(f"%{g.strip()}%") for g in genre.split()])
    ).limit(count).all()
    print(f"🔍 Searching for: {genre} | Found: {len(movies)} movies")
    db.close()

    if not movies:
        return jsonify({"message": f"Sorry, no {genre} movies found!"})

    poster_data = []
    for movie in movies:
        poster_data.append(get_poster(movie.movie_id))

    for i, movie in enumerate(movies):
        movie.poster_url = poster_data[i].get("poster_url")
        movie.title = poster_data[i].get("title")
        movie.overview = poster_data[i].get("overview")
        movie.release_date = poster_data[i].get("release_date")
        movie.genres = poster_data[i].get("genres")
        movie.vote_average = poster_data[i].get("vote_average")

        # filter out movies without a poster or title
        if not movie.poster_url or not movie.title or not movie.release_date:
            movies.remove(movie)

    # ✅ Format movies for chatbot response
    movie_list = [
        {"movie_id": movie.movie_id, "title": movie.title, "poster_url": movie.poster_url or "N/A"} # noqa
        for movie in movies
    ]

    response_text = f"Here are the top {count} {genre} movies:\n" + "\n".join(
       [f"- {m['title']} s" for m in movie_list]
    )

    return jsonify({"response": response_text, "movies": movie_list})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host='0.0.0.0', port=5001)
