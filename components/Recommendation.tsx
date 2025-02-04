"use client";

import React from "react";
import { useFetchRec } from "@/hooks/use-fetch-rec";
import { usePosters } from "@/hooks/use-posters";

const Recommendation = () => {
  const { data: recommendations, isLoading, error } = useFetchRec();
  const { posters, loading: loadingPosters, error: posterError } = usePosters();

  if (isLoading || loadingPosters) {
    return <div>Loading...</div>;
  }

  if (error || posterError) {
    return <div>{error || posterError}</div>;
  }

  console.log("Recommendations:", recommendations);
  console.log("Posters:", posters);

  // Flatten recommendations if nested
  const movies = recommendations[0] || []; // Access the first array if nested
  const poster = posters || [];

  // Map recommendations with their corresponding posters
  // Map recommendations with their corresponding posters
  const mappedRecommendations = movies.map((movie: any) => {
    const matchedPoster = posters.find(
      (poster) => poster.movie_id === movie.movie_id
    );

    return {
      ...movie,
      poster_url: matchedPoster?.poster || null, // Add poster_url if found
    };
  });

  return (
    <div className="w-full">
      <h2 className="font-bebas-neue text-4xl text-yellow-200">
        Recommendations for you
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mb-4 justify-center items-center">
        {mappedRecommendations.map((movie: any, index: any) => (
          <li key={`${movie?.movie_id}-${index}`}>
            <img
              src={movie?.poster_url || movie?.poster}
              alt={movie.title}
              className="rounded-lg object-cover mb-5"
            />
            <h3 className="text-center text-lg font-bold text-light-200">
              {movie.title}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;

// "use client";

// import React from "react";
// import { useFetchRec } from "@/hooks/use-fetch-rec";
// import { usePosters } from "@/hooks/use-posters";

// const Recommendation = () => {
//   const { data, isLoading, error } = useFetchRec();
//   const { posters, loading, error: posterError } = usePosters();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const recommendations = data || [];

//   const mappedRecommendations = recommendations.map((movie: any) => {
//     const matchedPoster = posters.find(
//       (poster) => poster.movie_id === movie.movie_id
//     );

//     return {
//       ...movie,
//       poster_url: matchedPoster?.poster || null, // Add poster_url if found
//     };
//   });

//   return (
//     <div className="w-full">
//       <h2 className="font-bebas-neue text-4xl text-yellow-200">
//         Recommendations for you
//       </h2>
//       <ul className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mb-4 space-y-8 md:space-y-0 justify-center items-center">
//         {recommendations.map((movie: any) => (
//           <li key={movie.movie_id}>
//             <img
//               src={mappedRecommendations?.poster}
//               alt={movie.title}
//               className="rounded-lg object-cover mb-5"
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Recommendation;
