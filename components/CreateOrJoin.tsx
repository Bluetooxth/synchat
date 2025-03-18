"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket, Plus } from "lucide-react";

export const CreateOrJoin = () => {
  const router = useRouter();
  const [roomID, setRoomID] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleJoinOrCreate = () => {
    const normalisedRoomID = roomID.trim().toLowerCase();
    if (!normalisedRoomID || !name.trim()) return;

    router.push(
      `/room?room=${encodeURIComponent(
        normalisedRoomID
      )}&name=${encodeURIComponent(name)}`
    );
  };

  return (
    <section className="flex justify-center items-center h-screen w-full px-5">
      <div className="flex flex-col justify-start items-center w-full max-w-lg p-5 rounded-xl bg-zinc-900 text-zinc-50">
        <h1 className="text-5xl font-medium mb-5 text-center flex flex-col">
          <span className="text-zinc-200">Welcome to</span>
          <span className="bg-gradient-to-bl from-rose-500 to-purple-500 bg-clip-text text-transparent">
            SynChat
          </span>
        </h1>
        <p className="text-center mb-5 text-md font-normal text-zinc-300">
          Join a room or create a new one to start chatting with your friends.
        </p>
        <input
          type="text"
          placeholder="Your Name"
          className="px-3 py-2 rounded-lg bg-transparent border border-zinc-600 outline-none text-lg font-normal text-zinc-50 mb-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          className="px-3 py-2 rounded-lg bg-transparent border border-zinc-600 outline-none text-lg font-normal text-zinc-50 mb-3 w-full"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <div className="flex justify-between w-full items-center gap-5 mt-2">
          <button
            onClick={handleJoinOrCreate}
            className="px-5 py-2 bg-rose-500 hover:bg-rose-700 text-zinc-50 rounded-lg font-normal text-lg w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Join <Rocket size={24} />
          </button>
          <button
            onClick={handleJoinOrCreate}
            className="px-5 py-2 bg-purple-500 hover:bg-purple-700 text-zinc-50 rounded-lg font-normal text-lg w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Create <Plus size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
