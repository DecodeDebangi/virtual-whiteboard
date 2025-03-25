"use client";

import initDraw from "@/draw";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id='canvas'
        width={2000}
        height={2000}
        style={{ border: "1px solid black" }}></canvas>
    </div>
  );
};

export default Canvas;
