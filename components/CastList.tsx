import React, { useState } from "react";
import CastCard from "./CastCard";

interface CastListProps {
  cast: {
    name: string;
    character: string;
    profile_path: string; // Relative path for the actor's profile image
  }[];
  initialVisible?: number;
}

const CastList: React.FC<CastListProps> = ({ cast, initialVisible = 5 }) => {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  console.log("👥 Cast List:", cast);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cast.slice(0, visibleCount).map((actor, index) => (
        <CastCard
          key={index}
          name={actor.name}
          character={actor.character}
          profile_path={actor.profile_path}
        />
      ))}
    </div>
  );
};

export default CastList;
