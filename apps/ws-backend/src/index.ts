import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = [];

const checkUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return decoded?.userId || null;
  } catch (error) {
    return null;
  }
};

wss.on("connection", (ws, request) => {
  console.log("New WebSocket connection");
  ws.send("Welcome to the WebSocket server!");
  const url = request.url;
  if (!url) {
    console.log("Invalid URL format");
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  console.log("userId", userId);
  console.log("token", token);
  console.log("url", url);
  if (!token) {
    console.log("Token not found");
    ws.close();
    return null;
  }

  if (!userId) {
    console.log("Invalid token");
    ws.close();
    return null;
  }

  console.log(`User ${userId} connected`);

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.type == "join_room") {
      const user = users.find((user) => user.ws === ws);
      user?.rooms.push(parsedData.roomId);
      console.log(`User ${user?.userId} joined room ${parsedData.roomId}`);
      console.log(`Current rooms: ${user?.rooms}`);
    }

    if (parsedData.type == "leave_room") {
      const user = users.find((user) => user.ws === ws);
      if (!user) return;
      user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
    }

    if (parsedData.type == "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          message: message,
          roomId,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId: roomId,
            })
          );
        }
      });
    }
  });
});
