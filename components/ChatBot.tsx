"use client";

import React, { useEffect, useState } from "react";
import { useChatbot } from "@/hooks/useChatBot";
import CloseIcon from "@/components/icons/CloseIcon";
import ChatBotIcon from "@/components/icons/ChatBotIcon";
import { Button } from "./ui/button";
import AgentIcon from "./icons/AgentIcon";
import Link from "next/link";
import MoviePlaceH from "./icons/MoviePlaceH";
import { useMotion } from "@/hooks/use-motion";

const ChatBot = () => {
  const [message, setMessage] = useState(""); // ✅ User input
  const { response, sendMessage } = useChatbot(); // ✅ New Hook
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  ); // ✅ Chat history
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ Toggle chat window
  const { motion, animations } = useMotion();

  console.log("🤖 ChatBot Response:", response);

  // ✅ Handle Sending Messages
  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      sendMessage(message);
      setMessage("");
    }
  };

  // ✅ Update Chat History with Bot Responses
  useEffect(() => {
    if (response) {
      setMessages((prev) => [
        ...prev,
        { text: response.text ?? "", sender: "bot" },
      ]);
    }
  }, [response]);

  return (
    <motion.div
      className="fixed bottom-4 right-4"
      initial="hidden"
      animate="visible"
      variants={animations.fadeIn}
    >
      {/* ✅ Chat Icon - Show when chat is closed */}
      <motion.div
        className="fixed bottom-4 right-4 items-end"
        initial="hidden"
        animate="visible"
        variants={animations.slideInFromRight}
      >
        {!isOpen && (
          <motion.div
            className="flex items-center gap-1"
            initial="hidden"
            animate="visible"
            variants={animations.slideInFromBottom}
          >
            <p className="chatbot_text">I can help you find movies! 🍿</p>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full shadow-lg transition"
            >
              <ChatBotIcon />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Chat Window - Show when chat is open */}
      {isOpen && (
        <div className="chatbot_window">
          <div className="flex justify-between rounded-lg border-2 p-3">
            <div className="flex items-center gap-2">
              <AgentIcon />
              <div>
                <p className="text-white font-semibold">Jason Rogan</p>
                <p className="text-sm text-green-500 font-bold">(Online)</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          {/* ✅ Chat Messages - Scrollable */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* ✅ Display Movie Recommendations */}
            {response?.movies && response.movies && (
              <div className="p-2 rounded-lg text-white">
                <div className="flex items-center gap-2">
                  <AgentIcon />
                  <p className="font-semibold text-sm">
                    Here are some recommendations 🎬:
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {response.movies.map((movie: any) => (
                    <Link
                      href={`/movies/${movie.movie_id}`}
                      key={movie.movie_id}
                      className="block"
                    >
                      <div className="flex items-center gap-2 p-2 bg-dark-100 rounded-lg">
                        {movie.poster_url && movie.poster_url !== "N/A" ? (
                          <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-16 h-24 rounded-lg object-cover"
                          />
                        ) : (
                          <MoviePlaceH /> // ✅ Show SVG Placeholder if no poster available
                        )}
                        <div>
                          <p className="text-sm font-semibold">{movie.title}</p>
                          <p className="text-xs text-gray-400">
                            {movie.genres}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Typing Indicator */}
            {isLoading && <p className="text-gray-400">Typing...</p>}
          </div>

          {/* ✅ Input & Send Button */}
          <div className="mt-3 flex items-end gap-2">
            <input
              id="chatbot_input"
              type="text"
              className="flex-1 p-2 border rounded-lg bg-gray-800 text-white"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              className="p-2 bg-blue-600 text-white rounded-lg"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatBot;
