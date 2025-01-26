"use client";
import React from "react";
import { usePosters } from "@/hooks/use-posters";
import TrailerModal from "./TrailerModal";
import CastList from "./CastList";

const MovieOverview = () => {
  const { posters, loading, error } = usePosters();

  console.log("Poster:", posters);

  if (loading) return <p>Loading poster...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!posters || posters.length === 0) return <p>No posters available.</p>;

  // Example: Selecting the first poster for the overview
  const selectedPoster = posters[5] || posters[0];
  console.log("Selected Poster:", selectedPoster);

  return (
    <section className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto mb-8 space-y-8 md:space-y-0">
        <div className="mx-auto">
          <img
            src={selectedPoster.poster}
            alt={selectedPoster.title}
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="mx-auto space-y-2">
          <div className="flex items-center gap-4">
            <h2 className="font-bebas-neue text-4xl text-gray-300">
              {selectedPoster.metadata.title}
            </h2>
            <span className="font-bebas-neue text-4xl text-gray-300">
              ({selectedPoster.metadata.release_date.split("-")[0]})
            </span>
          </div>
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
          <p className="text-sm text-gray-300">
            <strong className="text-lime-100">Homepage:</strong>{" "}
            <a
              href={selectedPoster?.metadata?.homepage}
              target="_blank"
              rel="noreferrer"
            >
              {selectedPoster?.metadata?.homepage || "N/A"}
            </a>
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-lime-100">status:</strong>{" "}
            {selectedPoster.metadata?.status || "N/A"}
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-lime-100">Original Language:</strong>{" "}
            {selectedPoster.metadata?.original_language || "N/A"}
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-lime-100">Revenue:</strong>{" "}
            {selectedPoster.metadata?.revenue?.toLocaleString() || "N/A"}
          </p>
          <div className="mt-2">
            <a
              href={`https://www.themoviedb.org/movie/${selectedPoster.tmdb_id}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on TMDB
            </a>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            <strong className="text-lime-100">Production Companies:</strong>{" "}
            {selectedPoster.metadata?.production_companies
              ?.map((company: any) => company.name)
              .join(", ") || "N/A"}
          </p>
          <p className="text-sm text-gray-300 mt-2">
            <strong className="text-red-400">IMDb ID:</strong>{" "}
            <a
              href={`https://www.imdb.com/title/${selectedPoster.metadata?.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              {selectedPoster.metadata?.imdb_id || "N/A"}
            </a>
          </p>
          <p className="text-sm text-gray-300 mt-2">
            <strong className="text-yellow-100">Origin Country:</strong>{" "}
            {selectedPoster.metadata?.origin_country || "N/A"}
          </p>
          {selectedPoster.videos
            ?.filter(
              (video: any) =>
                video.type === "Trailer" && video.site === "YouTube"
            )
            .map((video: any) => (
              <div key={video.id} className="my-4">
                <TrailerModal videoKey={video.key} videoTitle={video.name} />
              </div>
            ))}
          <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
          <CastList cast={selectedPoster.cast} />
        </div>
      </div>
    </section>
  );
};

export default MovieOverview;
