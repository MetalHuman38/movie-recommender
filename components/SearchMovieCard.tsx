import React from "react";
import Link from "next/link";

export const SearchMovieCard = ({
  title,
  movie_id,
  poster_url,
  vote_average,
  genres,
  year,
}: any) => {
  return (
    <Link
      href={`/movies/${movie_id}`}
      className="flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex flex-col rounded-lg">
        <img
          src={poster_url}
          alt={title}
          className="rounded-lg mb-4 w-32 object-cover"
        />
        <h3 className="text-xl font-bold text-yellow-50 mb-2">{title}</h3>
        <div className="book-info">
          <p className="book-genre">
            Genre: <span className="font-bold text-light-200">{genres}</span>
          </p>
          <p className="book-genre">
            Rating:{" "}
            <span className="font-bold text-light-200">{vote_average}</span>
          </p>
          <p className="book-genre">
            Release Date:{" "}
            <span className="font-bold text-light-200">{year}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchMovieCard;
