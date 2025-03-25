import React from "react";
import { BACKEND_HTTP_URL, JWT_TOKEN } from "../app/config";
import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";

const getChats = async (roomId: string) => {
  //   const response = await axios.get(`${BACKEND_HTTP_URL}/chats/${roomId}`);
  const response = await axios.get(`${BACKEND_HTTP_URL}/chats/${roomId}`, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return response.data.chats;
};
const ChatRoom = async ({ id }: { id: string }) => {
  const chats = await getChats(id);
  return <ChatRoomClient messages={chats} id={id}></ChatRoomClient>;
};

export default ChatRoom;
