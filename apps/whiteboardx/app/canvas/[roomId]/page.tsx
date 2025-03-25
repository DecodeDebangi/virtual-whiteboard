"use client";

import { useEffect, useRef } from "react";
import { start } from "repl";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      let clicked = false;
      let startX = 0;
      let startY = 0;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        console.log(e.clientX, e.clientY);
        startX = e.clientX;
        startY = e.clientY;
        // ctx.beginPath();
        // ctx.moveTo(e.clientX, e.clientY);
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        console.log(e.clientX, e.clientY);
        // ctx.beginPath();
        // ctx.moveTo(e.clientX, e.clientY);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          console.log(e.clientX, e.clientY);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeRect(startX, startY, width, height);

          //   ctx.beginPath();
          //   ctx.moveTo(e.clientX, e.clientY);
        }
      });
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id='canvas'
        width='1000'
        height='1000'
        style={{ border: "1px solid black" }}></canvas>
    </div>
  );
};

export default Canvas;
