"use client";

import { BACKEND_WS_URL, JWT_TOKEN } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const RoomCanvas = ({ roomId }: { roomId: String }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${BACKEND_WS_URL}?token=${JWT_TOKEN}`);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
      console.log("Connected to WebSocket server");
    };
  }, []);

  if (!socket) {
    return <div className='text-red-600'>Loading...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />

      {/* <div className='absolute bottom-1 right-0 left-0 flex justify-center gap-4 p-4'>
        <button className='bg-white text-black px-2 py-1 rounded'>Rect</button>
        <button className='bg-white text-black px-2 py-1 rounded'>
          Circle
        </button>
        <button className='bg-white text-black px-2 py-1 rounded'>Line</button>
      </div> */}
    </div>
  );
};

export default RoomCanvas;
