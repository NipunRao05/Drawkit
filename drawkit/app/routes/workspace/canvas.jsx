
"use client";

import React, { useRef, useState, useEffect } from "react";

export default function CanvasArea() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });
  const [rectSize, setRectSize] = useState({ width: 100, height: 80 });
  const [circleRadius, setCircleRadius] = useState(40);

  useEffect(() => {
    const toolSetting = localStorage.getItem("tool");
    if (toolSetting) setTool(toolSetting);
  }, []);

  useEffect(() => {
    localStorage.setItem("tool", tool);
  }, [tool]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setPosition({ x, y });

    const ctx = canvas.getContext("2d");
    if (tool === "rect") {
      ctx.fillStyle = "#444";
      ctx.fillRect(x, y, rectSize.width, rectSize.height);
      setIsDrawing(false);
    } else if (tool === "circle") {
      ctx.fillStyle = "#888";
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || tool !== "pen") return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDragStart = (e) => {
    setDragging(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - position.x;
    const deltaY = e.clientY - position.y;
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.style.left = `${canvasContainer.offsetLeft + deltaX}px`;
    canvasContainer.style.top = `${canvasContainer.offsetTop + deltaY}px`;
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div
      id="canvas-container"
      className="absolute"
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border shadow-md bg-white"
      ></canvas>
    </div>
  );
}

