import { BACKEND_HTTP_URL, JWT_TOKEN } from "@/config";
import axios from "axios";

export const getExistingShapes = async (roomId: String) => {
    // const res = await axios.get(`${BACKEND_HTTP_URL}/chats/${roomId}`);
    const response = await axios.get(`${BACKEND_HTTP_URL}/chats/${roomId}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
    const messages = response.data.chats;
  
    const shapes = messages.map((message: any) => {
      console.log(message);
      const messageData = JSON.parse(message.message);
  
      return messageData;
    });
  
    return shapes;
  };