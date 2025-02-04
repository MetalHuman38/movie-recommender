"use client";

import React, { useState } from "react";
import ChatBotCard from "./ChatBotCard";
import { useChatbot } from "@/hooks/use-chatbot";

const ChatBot = () => {
  const [message, setMessage] = useState(""); // ✅ Input state
  const { response, isLoading, sendMessage } = useChatbot(); // ✅ Use chatbot hook

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage(""); // ✅ Clear input after sending
    }
  };

  return (
    <div className="p-4 space-y-4">
      <ChatBotCard response={response?.message} />

      <div className="flex max-w-2xl mx-auto gap-3">
        {/* ✅ Input for user message */}
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg bg-gray-800 text-white"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* ✅ Send Button */}
        <button
          className="p-2 bg-blue-600 text-white rounded-lg"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
