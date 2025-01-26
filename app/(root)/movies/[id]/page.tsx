"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define the metadata interface
interface Metadata {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
}

export const MovieDetails = () => {
  const { id } = useParams(); // Get `id` (tmdb_id) from the URL
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMetadata = async () => {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
      const baseUrl = "https://api.themoviedb.org/3";

      try {
        const response = await fetch(
          `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie metadata");
        }

        const data = await response.json();
        setMetadata(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!metadata) return <p>No details available for this movie.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto mb-8 max-w-5xl">
      {/* Poster on the left */}
      <div className="flex flex-col justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${metadata.poster_path}`}
          alt={metadata.title}
          className="rounded-lg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Button
          className="mt-4 movie-btn"
          onClick={() => alert("Watch Trailer")}
        >
          Add to Watchlist
        </Button>
      </div>
      {/* Details on the right */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-bebas-neue text-4xl text-gray-300">
          {metadata.title}
        </h1>
        <p className="italic text-gray-200">{metadata.tagline}</p>
        <p className="text-gray-200">{metadata.overview}</p>
        <p className="text-gray-200">
          <strong className="text-red-300">Genres:</strong>{" "}
          {metadata.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-sm text-green-500">
          <strong>Release Date:</strong> {metadata.release_date}
        </p>
        <p className="text-sm text-gray-300">
          <strong>Runtime:</strong> {metadata.runtime} minutes
        </p>
        <p className="text-sm text-yellow-600">
          <strong>Rating:</strong> {metadata.vote_average} / 10
        </p>
        <p className="text-sm text-green-500">
          <strong>Budget:</strong> ${metadata.budget.toLocaleString()}
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-lime-100">Homepage:</strong>{" "}
          <a
            href={metadata.homepage}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {metadata.homepage}
          </a>
        </p>
        <p className="text-sm text-gray-300">
          <strong className="text-lime-100">Production Companies:</strong>{" "}
          {metadata.production_companies
            .map((company) => company.name)
            .join(", ")}
        </p>
        <p className="text-sm text-gray-300 mt-2">
          <strong className="text-red-400">IMDb ID:</strong>{" "}
          <a
            href={`https://www.imdb.com/title/${metadata.imdb_id}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {metadata.imdb_id}
          </a>
        </p>
        <p className="text-sm text-gray-300">
          <strong className="">Origin Country:</strong>{" "}
          {metadata.origin_country.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
