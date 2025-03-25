import { useEffect, useState } from "react";
import { BACKEND_WS_URL, JWT_TOKEN } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`${BACKEND_WS_URL}?token=${JWT_TOKEN}`);
    socket.onopen = () => {
      console.log("ws open");
      setSocket(socket);
      setLoading(false);
    };
  }, []);

  return { socket, loading };
}
