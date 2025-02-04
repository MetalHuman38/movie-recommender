import React, { useState, useEffect } from "react";

interface ChatBotCardProps {
  response?: string;
}

const ChatBotCard: React.FC<ChatBotCardProps> = ({ response }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!response) {
      setDisplayText(""); // Reset text when response is empty
      return;
    }

    let i = 0;
    setDisplayText(""); // Reset before typing new response

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + response[i]);
      i++;

      if (i === response.length) clearInterval(interval);
    }, 50); // Adjust speed here (e.g., 30ms for faster effect)

    return () => clearInterval(interval);
  }, [response]);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-300">🤖 ChatBot</h2>
      <p className="text-sm text-gray-400 mt-2">
        {displayText || "Waiting for response..."}
        {response && displayText.length < response.length && (
          <span className="animate-pulse">|</span> // Blinking cursor effect
        )}
      </p>
    </div>
  );
};

export default ChatBotCard;

// import React from "react";

// interface ChatBotCardProps {
//   response?: string;
// }

// const ChatBotCard: React.FC<ChatBotCardProps> = ({ response }) => {
//   return (
//     <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-lg font-semibold text-gray-300">🤖 ChatBot</h2>
//       <p className="text-sm text-gray-400 mt-2">
//         {response || "Waiting for response..."}
//       </p>
//     </div>
//   );
// };

// export default ChatBotCard;
