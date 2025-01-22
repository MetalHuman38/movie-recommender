"use client";
import React from "react";
import { usePosters } from "@/hooks/use-posters";

const MovieOverview = () => {
  const { posters, loading, error } = usePosters();

  console.log("Poster:", posters);

  if (loading) return <p>Loading poster...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!posters || posters.length === 0) return <p>No posters available.</p>;

  // Example: Selecting the first poster for the overview
  const selectedPoster = posters[3] || posters[0];

  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto mb-8">
        <div className="mx-auto">
          <img
            src={selectedPoster.poster}
            alt={selectedPoster.title}
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="mx-auto">
          <h2 className="text-lg font-bold">{selectedPoster.title}</h2>
          <p className="text-sm text-gray-300">
            <strong>Genres:</strong>{" "}
            {selectedPoster.metadata?.genres
              ?.map((genre: any) => genre.name)
              .join(", ") || "N/A"}
          </p>
          <p className="text-sm text-green-500">
            <strong>Release Date:</strong>{" "}
            {selectedPoster.metadata?.release_date || "N/A"}
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-yellow-100">Overview:</strong>{" "}
            {selectedPoster.metadata?.overview || "No overview available."}
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-red-400">Tagline:</strong>{" "}
            {selectedPoster.metadata?.tagline || "No tagline available."}
          </p>
          <div className="flex items-center space-x-2 text-lime-100">
            {/* Star Icon */}
            <img
              src="/icons/star.svg"
              alt="IMDB Logo"
              className="w-4 h-4 text-yellow-400 cursor-pointer"
            />
            <img
              src="/icons/star.svg"
              alt="IMDB Logo"
              className="w-4 h-4 text-yellow-400 cursor-pointer"
            />
            <img
              src="/icons/star.svg"
              alt="IMDB Logo"
              className="w-4 h-4 text-yellow-400 cursor-pointer"
            />
            <img
              src="/icons/star.svg"
              alt="IMDB Logo"
              className="w-4 h-4 text-yellow-400 cursor-pointer"
            />

            {/* Rating */}
            <span className="text-sm font-medium">
              {selectedPoster.metadata?.vote_average || "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-300">
            <strong className="text-lime-100">Runtime:</strong>{" "}
            {selectedPoster.metadata?.runtime || "N/A"} minutes
          </p>
          <p className="text-sm text-green-500">
            <strong className="text-gray-300">Budget:</strong> $
            {selectedPoster.metadata?.budget?.toLocaleString() || "N/A"}
          </p>
          <p>
            <strong>Homepage:</strong>{" "}
            <a
              href={selectedPoster?.metadata?.homepage}
              target="_blank"
              rel="noreferrer"
            >
              {selectedPoster?.metadata?.homepage || "N/A"}
            </a>
          </p>

          <div className="mt-4">
            <a
              href={`https://www.themoviedb.org/movie/${selectedPoster.tmdb_id}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on TMDB
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieOverview;
