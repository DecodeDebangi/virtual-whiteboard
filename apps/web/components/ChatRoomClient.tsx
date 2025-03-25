"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const ChatRoomClient = ({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) => {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState(messages || []);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      socket.onmessage = async (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          console.log("parsedData", parsedData);
          // if (parsedData.roomId === id) {
          // alert(event.data);
          setChats((prevChats) => [
            ...prevChats,
            { message: parsedData.message },
          ]);
          console.log("chats", chats);
          // }
        }
      };
      // socket.send(JSON.stringify({ roomId: id }));
    }
  }, [socket, loading, id]);

  return (
    <div>
      <h1>Chat Room: {id}</h1>
      {chats?.map((chat: any, index: number) =>
        chat?.message ? (
          <div key={index}>
            <p>{chat.message}</p>
          </div>
        ) : null
      )}

      <input
        type='text'
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              message: currentMessage,
              roomId: id,
            })
          );
          setCurrentMessage("");
        }}>
        Send Message
      </button>
    </div>
  );
};
