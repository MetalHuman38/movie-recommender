"use client";

import React from "react";
import { usePosters } from "@/hooks/use-posters";
import Link from "next/link";
import { useMotion } from "@/hooks/use-motion";

export const MoviePosters = () => {
  const { posters, loading, error } = usePosters();
  const { motion, containerControls, animations } = useMotion();

  if (loading) return <p>Loading posters...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div className="movie-list">
      <motion.ul
        className="movie-list"
        initial="hidden"
        animate="visible"
        variants={animations.fadeIn}
      >
        {posters.map((poster) => (
          <Link href={`/movies/${poster.tmdb_id}`} key={poster.movie_id}>
            <motion.li
              style={{ textAlign: "center" }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={animations.whileTap}
            >
              <img
                src={poster.poster}
                alt={`Poster for movie ID ${poster.movie_id}`}
                style={{
                  width: "150px",
                  height: "225px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default MoviePosters;
