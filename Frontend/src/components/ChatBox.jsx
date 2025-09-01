"use client";

import { AuthContext } from "@/context/AuthContext";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { CREATE_CONVERSATION } from "@/graphql/Mutations/ConversationMutations";
import { SEND_MESSAGE } from "@/graphql/Mutations/MessageMutations";
import { SUBSCRIBE_TO_MESSAGES } from "@/graphql/Subscription/MessageSubscription";
import { GET_MESSAGES } from "@/graphql/Queries/MessageQueries";

const ChatBox = () => {
  const { accessToken } = useContext(AuthContext);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      sender: "gemini",
      message: "Hi, how can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { data: messageData } = useQuery(GET_MESSAGES, {
    skip: !conversationId,
    variables: { conversationId },
  });

  useSubscription(SUBSCRIBE_TO_MESSAGES, {
    variables: { conversationId },
    onData: ({ data }) => {
      const botMessage = data?.data?.messageSent;
      if (botMessage) {
        setMessages((prev) => [...prev, normalizeMessage(botMessage)]);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!accessToken || conversationId) return;
    startConversation();
  }, [accessToken]);

  useEffect(() => {
    if (messageData?.getMessages) {
      const normalized = messageData.getMessages.map(normalizeMessage);
      setMessages((prev) => [...prev, ...normalized]);
    }
  }, [messageData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = async () => {
    try {
      const res = await createConversation();
      const newConvId = res.data.createConversation._id;
      setConversationId(newConvId);
    } catch (err) {
      console.error("Error creating conversation:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await sendMessage({
        variables: {
          text: input,
          conversationId,
        },
      });

      const userMessage = res.data.sendMessage;
      setMessages((prev) => [...prev, normalizeMessage(userMessage)]);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      setLoading(false);
    }
  };

  const normalizeMessage = (msg) => ({
    sender: msg.sender || msg.from || "bot",
    message: msg.message || msg.text || "",
  });

  return (
    <div className="max-w-lg mx-auto my-10 flex flex-col h-[600px] border rounded-xl shadow-lg bg-white overflow-hidden">

      <div className="bg-teal-600 text-white px-4 py-3 text-lg font-semibold">
        Chat with AI Bot
      </div>


      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow text-sm max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic text-sm">Bot is typing...</div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="flex items-center border-t px-4 py-2 bg-white">
        <input
          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type your message..."
          disabled={!conversationId}
        />
        <button
          onClick={handleSend}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50"
          disabled={!input.trim() || loading || !conversationId}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
