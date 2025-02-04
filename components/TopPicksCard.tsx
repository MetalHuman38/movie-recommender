// "use client";
// import React from "react";
// import Link from "next/link";
// import { useFetchRand } from "@/hooks/use-fetch-rand";
// import { TopPicksCardProps } from "./index";

// const TopPicksCard = () => {
//   const { data, isLoading, error } = useFetchRand();

//   if (isLoading) {
//     return <div className="text-center py-4">Loading top picks...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-4">Error: {error}</div>;
//   }

//   const topPicks = data?.movies || [];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {topPicks.map((movie: TopPicksCardProps) => (
//         <Link
//           href={`/movies/${movie.movie_id}`}
//           key={movie.movie_id}
//           // Use the movie's link for navigation
//           className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
//         >
//           <div className="text-center text-light-400">
//             <img
//               src={movie.poster_url}
//               alt={movie.title}
//               className="w-full object-cover"
//             />
//           </div>
//           <div className="p-4">
//             <h3 className="text-2xl font-semibold mb-2 text-light-400">
//               {movie.title}
//             </h3>
//             <p className=" text-light-200 mb-2 font-semibold">
//               {Array.isArray(movie.genres)
//                 ? movie.genres.join(", ")
//                 : movie.genres}
//             </p>
//             <div className="flex gap-1">
//               <span className="text-yellow-500 items-center">⭐⭐⭐⭐⭐</span>
//               <span className="text-md items-center text-light-300">
//                 {Number(movie.vote_average).toFixed(1)}
//               </span>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default TopPicksCard;

"use client";
import React from "react";
import Link from "next/link";
import { useFetchRand } from "@/hooks/use-fetch-rand";
import { TopPicksCardProps } from "./index";

const TopPicksCard = () => {
  const { data, isLoading, error } = useFetchRand();

  if (isLoading) {
    return <div className="text-center py-4">Loading top picks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  const topPicks = data?.movies || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {topPicks.map((movie: TopPicksCardProps) => (
        <div
          key={movie.movie_id}
          className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Poster is clickable */}
          <Link
            href={`/movies/${movie.movie_id}`}
            className="text-center block"
          >
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full object-cover"
            />
          </Link>

          {/* Metadata */}
          <div className="p-4">
            <h3 className="text-2xl font-semibold mb-2 text-light-400">
              {movie.title}
            </h3>
            <p className="text-light-200 mb-2 font-semibold">
              {Array.isArray(movie.genres)
                ? movie.genres.join(", ")
                : movie.genres}
            </p>

            {/* Ratings */}
            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  console.log(`Rate movie ID ${movie.movie_id}`);
                  // Add logic to handle rating functionality
                }}
                className="text-yellow-500"
              >
                ⭐⭐⭐⭐⭐
              </button>
              <span className="text-md text-light-300">
                {Number(movie.vote_average).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPicksCard;
