import React from "react";
import { Button } from "@/components/ui/button";
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";
import MovieDetailsClient from "@/components/MovieDetailsClient";

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
}

const MovieDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params)?.id; // ✅ This is movieId
  if (!params || !id) {
    console.error("❌ No movie ID provided.");
    return <p>Movie not found.</p>;
  }

  console.log("🔍 Fetching movie details for movieId:", id);

  // 🔹 Fetch `tmdbId` from database using `movieId`
  const result = await drizzledb
    .select({ tmdbId: coreMovie.tmdbId })
    .from(coreMovie)
    .where(eq(coreMovie.movieId, Number(id)))
    .limit(1)
    .execute();

  console.log("🔍 Database Query Result:", result);

  if (!result || result.length === 0) {
    console.error("❌ No tmdbId found for movieId:", id);
    return <p>Movie not found.</p>;
  }

  const { tmdbId } = result[0];

  // 🔹 Fetch metadata from TMDb API
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";
  const response = await fetch(
    `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`
  );

  if (!response.ok) {
    console.error("❌ Failed to fetch movie metadata.");
    return <p>Movie data unavailable.</p>;
  }

  const movie: Movie = await response.json();
  console.log("✅ Movie data fetched:", movie.title);

  return <MovieDetailsClient movie={movie} />;
};

export default MovieDetails;

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { drizzledb } from "@/db/drizzle";
// import { coreMovie } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import MovieDetailsClient from "@/components/MovieDetailClient";

// interface Movie {
//   title: string;
//   poster_path: string;
//   overview: string;
//   genres: { id: number; name: string }[];
//   release_date: string;
//   vote_average: number;
//   runtime: number;
//   tagline: string;
//   production_companies: { id: number; name: string }[];
//   budget: number;
//   homepage: string;
//   imdb_id: string;
//   origin_country: string[];
// }

// const MovieDetails = async ({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) => {
//   const id = (await params)?.id; // ✅ This is movieId
//   if (!params || !id) {
//     console.error("❌ No movie ID provided.");
//     return <p>Movie not found.</p>;
//   }

//   console.log("🔍 Fetching movie details for movieId:", id);

//   // 🔹 Fetch `tmdbId` from database using `movieId`
//   const result = await drizzledb
//     .select({ tmdbId: coreMovie.tmdbId })
//     .from(coreMovie)
//     .where(eq(coreMovie.movieId, Number(id)))
//     .limit(1)
//     .execute();

//   console.log("🔍 Database Query Result:", result);

//   if (!result || result.length === 0) {
//     console.error("❌ No tmdbId found for movieId:", id);
//     return <p>Movie not found.</p>;
//   }

//   const { tmdbId } = result[0];

//   // 🔹 Fetch metadata from TMDb API
//   const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
//   const baseUrl = "https://api.themoviedb.org/3";
//   const response = await fetch(
//     `${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`
//   );

//   if (!response.ok) {
//     console.error("❌ Failed to fetch movie metadata.");
//     return <p>Movie data unavailable.</p>;
//   }

//   const movie: Movie = await response.json();
//   console.log("✅ Movie data fetched:", movie.title);

//   return (
//     <section className="max-w-7xl p-6">
//       <div className="book-overview">
//         <div className="flex justify-center w-full h-full">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//             className="my-4 rounded-lg"
//             // width={800}
//             // height={850}
//             style={{ width: "400px", height: "400px%", objectFit: "cover" }}
//           />
//           <Button
//             className="mt-4 movie-btn"
//             onClick={() => alert("Watch Trailer")}
//           >
//             Add to Watchlist
//           </Button>
//         </div>
//         <div className="flex flex-col space-y-2">
//           <p className="text-3xl font-bold text-light-200">
//             <strong className="text-yellow-500">Title: </strong>
//             <span className="text-light-200 italic">{movie.title}</span>
//           </p>
//           <p className="text-gray-100 text-wrap whitespace-normal">
//             <strong> Overview: </strong>
//             {movie.overview}
//           </p>
//           <p className="text-gray-400">
//             <strong className="font-bold text-light-400"> Genre: </strong>{" "}
//             {movie.genres.map((genre) => genre.name).join(", ")}
//           </p>
//           <p className="text-gray-400">
//             <strong className="font-bold text-light-400">
//               {" "}
//               Release Date:{" "}
//             </strong>
//             {movie.release_date}
//           </p>
//           <p className="text-gray-400">
//             <strong className="text-yellow-500">Rating: </strong>
//             {movie.vote_average}
//           </p>
//           <p className="text-gray-400">
//             <strong className="text-light-400">Runtime: </strong>
//             {movie.runtime} minutes
//           </p>
//           <p className="text-gray-100">
//             <strong className="text-lg text-light-400">Tagline: </strong>
//             <span className="italic"> {movie.tagline} </span>
//           </p>
//           <p className="text-light-100">
//             <strong className="text-light-400">Production Companies: </strong>
//             {movie.production_companies
//               .map((company) => company.name)
//               .join(", ")}
//           </p>
//           <p className="text-light-400">
//             <strong className="text-green-700">Budget: </strong>$
//             {movie.budget.toLocaleString()}
//           </p>
//           <p>
//             Homepage:{" "}
//             <a href={movie.homepage} target="_blank" rel="noreferrer">
//               {movie.homepage}
//             </a>
//           </p>
//           <p>
//             <strong className="text-lg">IMDb ID: {movie.imdb_id} </strong>
//             <a
//               href={`https://www.imdb.com/title/${movie.imdb_id}`}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               (View on IMDb)
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MovieDetails;
