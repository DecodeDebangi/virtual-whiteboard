import { BACKEND_HTTP_URL, JWT_TOKEN } from "@/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "line";
      x: number;
      y: number;
      x2: number;
      y2: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
    };

export const initDraw = async (
  canvas: HTMLCanvasElement,
  roomId: String,
  socket: WebSocket
) => {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) return;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      // existingShapes.push(parsedShape.shape);
      existingShapes.push(parsedShape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    console.log(e.clientX, e.clientY);
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      height: height,
      width: width,
    };
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId: roomId,
      })
    );
    console.log(e.clientX, e.clientY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      console.log(e.clientX, e.clientY);

      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

const clearCanvas = (
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(existingShapes);

  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "line") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();
    } else if (shape.type === "circle") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });
};

const getExistingShapes = async (roomId: String) => {
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

export default initDraw;
