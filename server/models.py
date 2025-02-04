from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    chat_history = relationship("chat_history", back_populates="user")


class Movie(Base):
    __tablename__ = "movies"

    movie_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    genres = Column(String(255))
    description = Column(String)
    release_date = Column(String)
    vote_average = Column(Float)
    poster_url = Column(String)
    description = Column(String)

    links = relationship("Link", back_populates="movie", lazy="joined")


class Link(Base):
    __tablename__ = "links"

    movie_id = Column(Integer, ForeignKey("movies.movie_id"), primary_key=True)
    imdb_id = Column(Integer)
    tmdb_id = Column(Integer)

    movie = relationship("Movie", back_populates="links")


class chat_history(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    response = Column(String)
    timestamp = Column(String)
    user = relationship("User", back_populates="chat_history")
