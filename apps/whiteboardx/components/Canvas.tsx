"use client";

// import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, PencilLine, Square } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "rect" | "line" | "circle" | "pencil";

const Canvas = ({ roomId, socket }: { roomId: String; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("rect");

  useEffect(() => {
    if (game) {
      game.setTool(selectedTool);
    }
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const g = new Game(canvas, roomId, socket);
      setGame(g);
      // initDraw(canvas, roomId, socket);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}>
      <canvas
        ref={canvasRef}
        id='canvas'
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: "1px solid black" }}></canvas>
      <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
  );
};

function TopBar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
}) {
  return (
    <div className='fixed top-2 left-2 bg-slate-200/60 p-2 rounded-full'>
      <div className='flex gap-2'>
        <IconButton
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
          onClick={() => {
            setSelectedTool("pencil");
          }}
        />
        <IconButton
          activated={selectedTool === "rect"}
          icon={<Square />}
          onClick={() => {
            setSelectedTool("rect");
          }}
        />
        <IconButton
          activated={selectedTool === "circle"}
          icon={<Circle />}
          onClick={() => {
            setSelectedTool("circle");
          }}
        />
        <IconButton
          activated={selectedTool === "line"}
          icon={<PencilLine />}
          onClick={() => {
            setSelectedTool("line");
          }}
        />
      </div>
    </div>
  );
}

export default Canvas;
