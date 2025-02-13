"use client";
import axios from "axios";
import { useState } from "react";

export default function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; text: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const simulateTyping = async (text: string, delay = 50) => {
    let index = 0;
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { ...prev[prev.length - 1], text: text.slice(0, ++index) },
          ]);
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = {
      type: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };
    // setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      // Add placeholder for bot response
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Typing...", timestamp: "" },
      ]);

      const res = await axios.post("http://localhost:3000/page/auth/api/chatbot", {
        prompt,
        history: messages.map(({ type, text }) => ({ role: type, content: text })), // Send history to backend
      });

      const botResponse = res.data.text || "I'm not sure how to respond.";
      await simulateTyping(botResponse);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: botResponse, timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "An error occurred. Please try again.", timestamp: new Date().toLocaleTimeString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = ["Can you elaborate?", "What do you mean?", "Tell me more"];

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Chatbot Container */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl flex flex-col p-6 space-y-4">
        {/* Chat Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Chatbot</h1>
          <p className="text-sm text-gray-500">Ask me anything!</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto max-h-[500px] p-4 space-y-4 bg-gray-50 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-xs p-4 rounded-xl ${
                  message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
                <span className="text-xs text-gray-400 absolute bottom-1 right-2">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        {messages[messages.length - 1]?.type === "bot" && (
          <div className="flex space-x-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setPrompt(reply)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-4 border-t pt-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
