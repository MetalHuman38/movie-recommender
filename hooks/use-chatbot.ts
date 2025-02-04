// Type: React Hook
import { useState, useRef } from "react";
import axiosInstance from "@/axiosConfig";
import isEqual from "lodash/isEqual";

interface ChatBotResponse {
  message: string;
  action?: string;
}

export const useChatbot = () => {
  const [response, setResponse] = useState<ChatBotResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const prevMessage = useRef<string | null>(null);

  const sendMessage = async (message: string) => {
    if (!message || isEqual(message, prevMessage.current)) {
      console.log("🚫 Skipping duplicate message:", message);
      return;
    }

    prevMessage.current = message;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/chatbot", { message });
      if (response.status === 200) {
        setResponse(response.data);
      }
    } catch (err: any) {
      console.error("❌ Chatbot Error:", err);
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, sendMessage };
};

// import { useState, useEffect, useMemo, useRef } from "react";
// import axiosInstance from "@/axiosConfig";
// import isEqual from "lodash/isEqual";
// import ratelimit from "@/lib/ratelimit";
// import { redirect } from "next/navigation";

// interface ChatBotResponse {
//   message: string;
//   action: string;
// }

// export const useChatbot = (message: string) => {
//   const [response, setResponse] = useState<ChatBotResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const prevMessage = useRef<string | null>(null);

//   useEffect(() => {
//     if (!message) {
//       return;
//     }

//     if (isEqual(message, prevMessage.current)) {
//       console.log("🚫 Skip duplicate message:", message);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     const fetchResponse = async () => {
//       try {
//         const response = await axiosInstance.post("/api/chatbot", {
//           message,
//         });

//         if (response.status === 200) {
//           setResponse(response.data);
//         }
//       } catch (err: any) {
//         console.error("❌ Chatbot Error:", err);
//         setError(err.message || "An error occurred while fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResponse();
//   }, [message]);

//   return { response, isLoading, error };
// };
