import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

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
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private roomId: String;
  private clicked: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private selectedTool: Tool = "pencil";
  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: String, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      //   console.log(message);

      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.existingShapes);

    this.existingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler(e: MouseEvent) {
    this.clicked = true;
    console.log(e.clientX, e.clientY);
    this.startX = e.clientX;
    this.startY = e.clientY;
  }
  mouseUpHandler(e: MouseEvent) {
    {
      this.clicked = false;
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      const selectedTool = this.selectedTool;
      let shape: Shape | null = null;
      if (selectedTool === "rect") {
        shape = {
          type: selectedTool,
          x: this.startX,
          y: this.startY,
          height,
          width,
        };
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        shape = {
          type: selectedTool,
          radius: radius,
          centerX: this.startX + radius,
          centerY: this.startY + radius,
        };
      }
      if (!shape) return;

      this.existingShapes.push(shape);

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify(shape),
          roomId: this.roomId,
        })
      );
      console.log(e.clientX, e.clientY);
    }
  }
  mouseMoveHandler(e: MouseEvent) {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      console.log(e.clientX, e.clientY);

      this.clearCanvas();

      //@ts-ignore
      const selectedTool = this.selectedTool;
      if (selectedTool === "rect") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = radius + this.startX;
        const centerY = radius + this.startY;
        // const radius = Math.sqrt(width * width + height * height) / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));

    this.canvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
  }
}
