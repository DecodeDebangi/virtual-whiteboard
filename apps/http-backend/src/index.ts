import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import { authMiddleware, AuthRequest } from "./authMiddleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: parsedData.error.errors });
      return;
    }
    if (!parsedData.data.email || !parsedData.data.password) {
      res.status(411).json({ message: "Invalid inputs" });
      return;
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email: parsedData.data?.email },
    });
    if (existingUser) {
      res.status(409).json({ message: "User already exists with this email!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        password: hashedPassword,
        email: parsedData.data?.email,
        username: parsedData.data?.username,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: parsedData.error.errors });
      return;
    }

    // const { username, password, email } = req.body;
    if (!parsedData.data.email || !parsedData.data.password) {
      res.status(411).json({ message: "Invalid inputs" });
      return;
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email: parsedData.data?.email },
    });
    if (
      !existingUser ||
      !(await bcrypt.compare(parsedData.data.password, existingUser.password))
    ) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ userId: existingUser?.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

app.post("/create-room", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: parsedData.error.errors });
      return;
    }

    const roomId = parsedData.data.name;
    if (
      !roomId ||
      roomId.length === 0 ||
      roomId === "undefined" ||
      roomId === "null"
    ) {
      res.status(411).json({ message: "Invalid room ID" });
      return;
    }

    // Create a new room in the database
    const newRoom = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: req.userId,
      },
    });

    res
      .status(201)
      .json({ message: "Room created successfully", roomId: newRoom.id });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

app.get("/chats/:roomId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const roomId = Number(req.params.roomId);
    if (!roomId) {
      res.status(400).json({ message: "Invalid room ID" });
      return;
    }
    const room = await prismaClient.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }
  
    // If user is not the admin and has not sent any messages in the room, deny access
    const isMember = await prismaClient.chat.findFirst({
      where: {
        roomId: roomId,
        userId: req.userId,
      },
    });

    if (room.adminId !== req.userId && !isMember) {
      res.status(403).json({ message: "You are not a member of this room" });
      return;
    }

    const chats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 100,
    });
    res.status(200).json({ chats });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
