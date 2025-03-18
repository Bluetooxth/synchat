import { useEffect, useState } from "react";
import ably from "@/lib/ably";
import type { Message } from "ably";

const useAbly = (roomId: string) => {
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const channel = ably.channels.get(`chat-${roomId}`);

  useEffect(() => {
    const messageHandler = (msg: Message) => {
      setMessages((prev) => [
        ...prev,
        { id: msg.id ?? crypto.randomUUID(), text: msg.data as string },
      ]);
    };

    channel.subscribe("message", messageHandler);

    return () => channel.unsubscribe("message", messageHandler);
  }, [roomId]);

  const sendMessage = (message: string) => {
    channel.publish("message", message);
  };

  return { messages, sendMessage };
};

export default useAbly;
