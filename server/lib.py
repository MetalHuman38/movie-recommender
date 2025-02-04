from sqlalchemy.orm import sessionmaker
from database import engine
from models import Movie
from schema import MovieSchema
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class MovieRecommender:
    """
    A class to provide movie recommendations based on content similarity.
    """

    def __init__(self):
        """
        Initialize the recommender by loading movie data into a DataFrame.
        """
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # noqa
        self.movies = self._load_movies()

    def _load_movies(self):
        """
        Load movie data from the database into a Pandas DataFrame.
        Returns:
            pd.DataFrame: DataFrame containing movie details.
        """
        session = self.SessionLocal()
        try:
            movies = session.query(Movie).all()
            movie_dicts = [MovieSchema.model_validate(movie).model_dump() for movie in movies] # noqa
            return pd.DataFrame(movie_dicts)
        except Exception as e:
            print(f"❌ Error loading movies: {e}")
            return pd.DataFrame()
        finally:
            session.close()

    def content_based_recommendation(self, movie_id, top_n=10):
        """
        Generate content-based movie recommendations using genre similarity.
        Args:
            movie_id (int): The movie ID to base recommendations on.
            top_n (int): Number of recommendations to return.
        Returns:
            List[dict]: Recommended movies.
        """
        if self.movies.empty:
            return {"error": "No movies found in the database."}

        try:
            idx = self.movies[self.movies["movie_id"] == movie_id].index[0]
        except IndexError:
            return {"error": f"Movie ID {movie_id} not found in the database."}

        # **🔹 Vectorize genres using TF-IDF**
        tfidf = TfidfVectorizer(stop_words="english")
        tfidf_matrix = tfidf.fit_transform(self.movies["genres"].fillna(""))

        # **🔹 Compute cosine similarity**
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        sim_scores = list(enumerate(cosine_sim[idx]))

        # **🔹 Sort by similarity & get top recommendations**
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        movie_indices = [i[0] for i in sim_scores[1 : top_n + 1]] # noqa

        # **🔹 Convert recommendations to a serializable format**
        recommendations = self.movies.iloc[movie_indices][["movie_id", "title", "genres"]] # noqa

        return recommendations.to_dict(orient="records")
