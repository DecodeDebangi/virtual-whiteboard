import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url || !url.includes("?") || !url.startsWith("ws://")) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
  if (!decoded || !decoded.userId) {
    ws.close();
    return;
  }

  const userId = decoded.userId;
  console.log(`User ${userId} connected`);

  ws.on("message", (data) => {
    console.log(`Received message => ${data}`);
  });
  ws.send("pong!");
});
