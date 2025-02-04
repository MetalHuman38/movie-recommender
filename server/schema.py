from pydantic import BaseModel
from typing import List, Optional


class LinkSchema(BaseModel):
    movie_id: int
    imdb_id: Optional[int] = None
    tmdb_id: Optional[int] = None

    class Config:
        from_attributes = True  # ✅ Enables SQLAlchemy to Pydantic conversion


class MovieSchema(BaseModel):
    movie_id: int
    title: str
    genres: Optional[str] = None
    description: Optional[str] = None
    release_date: Optional[str] = None
    vote_average: Optional[float] = None
    poster_url: Optional[str] = None
    links: List[LinkSchema] = []  # ✅ Include links in response

    class Config:
        from_attributes = True  # ✅ Enables SQLAlchemy to Pydantic conversion
