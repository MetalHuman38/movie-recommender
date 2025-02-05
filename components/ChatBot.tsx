"use client";

import React, { useEffect, useState } from "react";
import { useChatbot } from "@/hooks/use-chatbot";
import CloseIcon from "@/components/icons/CloseIcon";
import ChatBotIcon from "@/components/icons/ChatBotIcon";
import { Button } from "./ui/button";
import AgentIcon from "./icons/AgentIcon";
import Link from "next/link";
import MoviePlaceH from "./icons/MoviePlaceH";
import { useMotion } from "@/hooks/use-motion";

const ChatBot = () => {
  const [message, setMessage] = useState(""); // ✅ Input state
  const { response, isLoading, sendMessage } = useChatbot(); // ✅ Hook for chatbot API
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  ); // ✅ Chat history

  const [isOpen, setIsOpen] = useState(false);
  const { motion, containerControls, animations } = useMotion();

  console.log("🤖 ChatBot Response:", response);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      sendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (response?.message) {
      setMessages((prev) => [
        ...prev,
        { text: response.message, sender: "bot" },
      ]); // ✅ Store chatbot response
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
          <div className="flex justify-between bg-black rounded-lg border-2">
            <div className="flex items-center justify-center top-4 left-4">
              <AgentIcon />
              <div className="">
                <div className="text-white font-ibm-plex-sans text-bold">
                  <p> Jason Rogan</p>
                  <p className="text-sm font-ibm-plex-sans">
                    Angent{" "}
                    <span className="font-bold text-green-600">(Online)</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="top-4 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          {/* ✅ Header with Close Button */}

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
            {response?.movies && (
              <div className="p-2 rounded-lg bg-gray-700 text-white">
                <div className="flex items-center gap-2">
                  <AgentIcon />
                  <p className="font-ibm-plex-sans text-pretty text-center text-sm font-semibold">
                    {`${response.response}`}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {response?.movies?.map((movie: any) => (
                    <Link
                      href={`/movies/${movie?.movie_id}`}
                      key={movie.movie_id}
                      className="block"
                    >
                      <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
                        {movie.poster_url !== "N/A" ? (
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
          </div>

          {/* ✅ Input & Send Button */}
          <div className="mt-3 flex gap-2">
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
