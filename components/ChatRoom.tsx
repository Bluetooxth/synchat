"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ably from "@/lib/ably";
import type { Message } from "ably";
import { SendHorizonal } from "lucide-react";

export const ChatRoom = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const name = searchParams.get("name") || "Guest";

  useEffect(() => {
    console.log("Room ID:", roomId);
    console.log("User Name:", name);
  }, [roomId, name]);

  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string }[]
  >([]);
  const [message, setMessage] = useState<string>("");

  if (!roomId) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-zinc-300">
        <h2>Loading room...</h2>
      </div>
    );
  }

  useEffect(() => {
    const channel = ably.channels.get(`chat-${roomId}`);

    const messageHandler = (msg: Message) => {
      const receivedData = msg.data as { sender: string; text: string };
      setMessages((prev) => [
        ...prev,
        {
          id: msg.id ?? crypto.randomUUID(),
          sender: receivedData.sender,
          text: receivedData.text,
        },
      ]);
    };

    channel.subscribe("message", messageHandler);
    return () => channel.unsubscribe("message", messageHandler);
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const channel = ably.channels.get(`chat-${roomId}`);
    channel.publish("message", { sender: name, text: message });
    setMessage("");
  };

  return (
    <section className="flex flex-col h-screen w-full p-5 bg-zinc-900 text-zinc-50">
      <div className="flex flex-col flex-1 container mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-medium text-zinc-300">Room: {roomId}</h1>
          <h2 className="text-lg font-medium text-zinc-300">{name}</h2>
        </div>
        <div className="flex-1 overflow-y-auto border border-zinc-700 rounded-lg p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-medium text-rose-400">{msg.sender}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-3 gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg bg-transparent border border-zinc-600 text-zinc-50 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-white rounded-lg hover:bg-zinc-200 text-zinc-900 font-normal transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
          >
            Send <SendHorizonal size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
