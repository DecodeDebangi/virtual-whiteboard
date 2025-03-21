import express, { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import dotenv from "dotenv";
import cors from "cors";
import { authMiddleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";

// dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req: Request, res: Response) => {
  const validationResult = CreateUserSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ message: validationResult.error.errors });
    return;
  }
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(411).json({ message: "Invalid inputs" });
    return;
  }

  // Check if the username already exists in the database

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user record in the database

  res.status(201).json({ message: "User created successfully" });
});

app.post("/signin", (req: Request, res: Response) => {
  const validationResult = SigninSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ message: validationResult.error.errors });
    return;
  }

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(411).json({ message: "Invalid inputs" });
    return;
  }
  // Check if the username exists in the database
  // If user not found or password is incorrect, return an error

  const token = jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});

app.post(
  "/create-room",
  authMiddleware,
  async (req: Request, res: Response) => {
    const validationResult = CreateRoomSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ message: validationResult.error.errors }); 
      return;
    }
    const { roomId } = req.body;
    if (!roomId) {
      res.status(411).json({ message: "Invalid room ID" });
      return;
    }
    // Create a new room in the database
    res.status(201).json({ message: "Room created successfully" });
    return;
  }
);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

