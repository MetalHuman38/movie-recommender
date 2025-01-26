import React from "react";

interface CastCardProps {
  name: string;
  character: string;
  profile_path: string; // Relative path for the actor's profile image
}

const CastCard: React.FC<CastCardProps> = ({
  name,
  character,
  profile_path,
}) => {
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w500${profile_path}`
    : "/fallback-profile.png"; // Use a fallback image if no profile picture is available

  return (
    <div className="text-white rounded-lg shadow-md flex flex-col items-center space-y-2">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="text-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-400">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
