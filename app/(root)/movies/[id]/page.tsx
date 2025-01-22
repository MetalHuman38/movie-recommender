"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

  if (loading) return <p>Loading movie details from api...</p>;

  if (!metadata) return <p>No details available for this movie from api.</p>;

  return (
    <div>
      <h1>{metadata.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${metadata.poster_path}`}
        alt={metadata.title}
        style={{
          width: "300px",
          height: "450px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <p>
        <strong>Tagline:</strong> {metadata.tagline}
      </p>
      <p>
        <strong>Overview:</strong> {metadata.overview}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {metadata.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>Release Date:</strong> {metadata.release_date}
      </p>
      <p>
        <strong>Runtime:</strong> {metadata.runtime} minutes
      </p>
      <p>
        <strong>Rating:</strong> {metadata.vote_average} / 10
      </p>
      <p>
        <strong>Budget:</strong> ${metadata.budget.toLocaleString()}
      </p>
      <p>
        <strong>Homepage:</strong>{" "}
        <a href={metadata.homepage} target="_blank" rel="noreferrer">
          {metadata.homepage}
        </a>
      </p>
      <p>
        <strong>Production Companies:</strong>{" "}
        {metadata.production_companies
          .map((company) => company.name)
          .join(", ")}
      </p>
      <p>
        <strong>IMDb ID:</strong>{" "}
        <a
          href={`https://www.imdb.com/title/${metadata.imdb_id}`}
          target="_blank"
          rel="noreferrer"
        >
          {metadata.imdb_id}
        </a>
      </p>
      <p>
        <strong>Origin Country:</strong> {metadata.origin_country.join(", ")}
      </p>
    </div>
  );
};

export default MovieDetails;
