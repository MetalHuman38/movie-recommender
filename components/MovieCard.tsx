import React from "react";
import Link from "next/link";
import { IMovies } from "@/components";

interface MovieCardProps {
  movie_id: number;
  genres: string;
  title: string;
  poster_url: string;
  ratings: number;
  tags: string;
  links: string;
  year: number;
  poster: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie_id,
  genres,
  title,
  poster_url,
  ratings,
  tags,
  links,
  year,
}) => {
  return (
    <Link href={`/movies/${movie_id}`} className="block">
      <div className="flex flex-col items-start hover:shadow-lg transition-shadow duration-200">
        <img
          src={poster_url}
          alt={title}
          className="rounded-lg mb-4 w-full object-cover"
        />
        <h3 className="text-xl font-bold text-yellow-50 mb-2">{title}</h3>
        <div className="book-info">
          <p className="book-genre">
            Genre: <span className="font-bold text-light-200">{genres}</span>
          </p>
          <p className="book-genre">
            Rating: <span className="font-bold text-light-200">{ratings}</span>
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

export default MovieCard;
