import React, { useState } from "react";

interface TrailerModalProps {
  videoKey: string; // YouTube video key
  videoTitle: string; // Trailer title
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  videoKey,
  videoTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to trigger modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Watch Trailer
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} // Close modal on background click
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
          >
            <div className="relative">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                onClick={() => setIsOpen(false)} // Close button
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerModal;
