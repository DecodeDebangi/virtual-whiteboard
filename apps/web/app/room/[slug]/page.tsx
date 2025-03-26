import axios from "axios";
import { BACKEND_HTTP_URL, JWT_TOKEN } from "../../config";
import ChatRoom from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  // const response = await axios.get(`${BACKEND_HTTP_URL}/room/${slug}`);
  const response = await axios.get(`${BACKEND_HTTP_URL}/room/${slug}`, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return response.data.roomId;
}

const ChatRoom1 = async ({ params }: { params: { slug: string } }) => {
  console.log("params", await params);

  const slug = (await params).slug;
  const roomId = await getRoomId(slug);

  console.log("roomId", roomId);

  return <ChatRoom id={roomId}></ChatRoom>;
};

export default ChatRoom1;
