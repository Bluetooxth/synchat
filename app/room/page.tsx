"use client";

import { ChatRoom } from "@/components/ChatRoom";
import React, { Suspense } from "react";

const ChatRoomPage = () => {
  return (
    <Suspense fallback={<div>Loading chat room...</div>}>
      <ChatRoom />
    </Suspense>
  );
};

export default ChatRoomPage;
