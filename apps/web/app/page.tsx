"use client";
import { useState } from "react";
// import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
      }}>
      <input
        style={{ padding: 10 }}
        type='text'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        style={{ padding: 10 }}
        onClick={() => {
          router.push(`/room/${roomId}`);
        }}>
        Join Room
      </button>
    </div>
  );
}
