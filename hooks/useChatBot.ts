import { useState } from "react";

interface ChatBotResponse {
  message?: string;
  response?: string; // ✅ Ensure response can be a string
  movies?: { movie_id: number; title: string; poster_url: string }[]; // ✅ Ensure correct type
  text?: string;
}

export const useChatbot = () => {
  const [response, setResponse] = useState<ChatBotResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/movies/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to get a response from chatbot.");
      }

      const data: ChatBotResponse = await res.json();

      // ✅ Store the ENTIRE response object
      setResponse(data);

      console.log("🤖 Chatbot Response from hook:", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, sendMessage };
};

// import { useState } from "react";

// interface ChatBotResponse {
//   message: string;
//   action?: string;
//   response?: [];
//   movies?: [];
//   movie_id?: number;
//   text?: string;
// }

// export const useChatbot = () => {
//   const [response, setResponse] = useState<ChatBotResponse | null>(null);
//   const [movies, setMovies] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = async (message: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/movies/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to get a response from chatbot.");
//       }

//       const data = await res.json();
//       setResponse(data.response || null);
//       setMovies(data.movies || []);
//       console.log("🤖 Chatbot Response from hook:", data.response);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { response, movies, loading, error, sendMessage };
// };
