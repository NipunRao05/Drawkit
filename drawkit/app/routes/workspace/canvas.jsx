"use client";

// import React, { useRef, useState, useEffect } from "react";

// export default function CanvasEditor() {
//   const canvasRef = useRef(null);
//   const [tool, setTool] = useState("pen");
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);

//   const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setIsDrawing(true);
//     setPosition({ x, y });

//     const ctx = canvas.getContext("2d");
//     if (tool === "rect") {
//       ctx.fillStyle = "#444";
//       ctx.fillRect(x, y, 100, 80);
//       setIsDrawing(false);
//     } else if (tool === "circle") {
//       ctx.fillStyle = "#888";
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2);
//       ctx.fill();
//       setIsDrawing(false);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== "pen") return;

//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const ctx = canvas.getContext("2d");

//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";
//     ctx.beginPath();
//     ctx.moveTo(position.x, position.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setPosition({ x, y });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const handleDragStart = (e) => {
//     setDragging(true);
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handleDrag = (e) => {
//     if (!dragging) return;
//     const deltaX = e.clientX - position.x;
//     const deltaY = e.clientY - position.y;
//     const canvasContainer = document.getElementById("canvas-container");
//     canvasContainer.style.left = `${canvasContainer.offsetLeft + deltaX}px`;
//     canvasContainer.style.top = `${canvasContainer.offsetTop + deltaY}px`;
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handleDragEnd = () => {
//     setDragging(false);
//   };

//   return (
//     <div className="w-screen h-screen bg-[#cae4ef] flex">
//       {/* Sidebar */}
//       <div className="w-56 bg-white p-4 flex flex-col justify-center gap-4 shadow-md">
//         <h2 className="text-lg font-bold text-center">Tools</h2>
//         <button onClick={() => setTool("pen")} className="bg-blue-100 py-2 rounded">🖊️ Pen</button>
//         <button onClick={() => setTool("rect")} className="bg-gray-800 text-white py-2 rounded">▭ Rectangle</button>
//         <button onClick={() => setTool("circle")} className="bg-purple-100 py-2 rounded">⚪ Circle</button>
//         <button onClick={() => {
//           const link = document.createElement('a');
//           link.download = 'canvas.png';
//           link.href = canvasRef.current.toDataURL();
//           link.click();
//         }} className="bg-green-200 py-2 rounded">💾 Save</button>
//         <label className="bg-yellow-100 py-2 rounded text-center cursor-pointer">
//           📷 Insert Image
//           <input type="file" accept="image/*" hidden onChange={(e) => {
//             const file = e.target.files[0];
//             if (!file) return;
//             const img = new Image();
//             img.onload = () => {
//               const ctx = canvasRef.current.getContext("2d");
//               ctx.drawImage(img, 0, 0);
//             };
//             img.src = URL.createObjectURL(file);
//           }} />
//         </label>
//       </div>

//       {/* Canvas Area */}
//       <div
//         id="canvas-container"
//         className="absolute"
//         onMouseDown={handleDragStart}
//         onMouseMove={handleDrag}
//         onMouseUp={handleDragEnd}
//         style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', cursor: dragging ? 'grabbing' : 'grab' }}
//       >
//         <canvas
//           ref={canvasRef}
//           width={canvasSize.width}
//           height={canvasSize.height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           className="border shadow-md bg-white"
//         ></canvas>
//       </div>
//     </div>
//   );
// }

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

// "use client";
// import React, { useRef, useState, useEffect } from "react";

// export default function CanvasEditor() {
//   const canvasRef = useRef(null);
//   const [tool, setTool] = useState("pen");
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState(false);
//   const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setIsDrawing(true);
//     setPosition({ x, y });

//     const ctx = canvas.getContext("2d");
//     if (tool === "rect") {
//       ctx.fillStyle = "#444";
//       ctx.fillRect(x, y, 100, 80); // Default size, can be adjusted
//       setIsDrawing(false);
//     } else if (tool === "circle") {
//       ctx.fillStyle = "#888";
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2); // Default radius, can be adjusted
//       ctx.fill();
//       setIsDrawing(false);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== "pen") return;

//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const ctx = canvas.getContext("2d");

//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";
//     ctx.beginPath();
//     ctx.moveTo(position.x, position.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setPosition({ x, y });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const handleDragStart = (e) => {
//     setDragging(true);
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handleDrag = (e) => {
//     if (!dragging) return;
//     const deltaX = e.clientX - position.x;
//     const deltaY = e.clientY - position.y;
//     const canvasContainer = document.getElementById("canvas-container");
//     canvasContainer.style.left = `${canvasContainer.offsetLeft + deltaX}px`;
//     canvasContainer.style.top = `${canvasContainer.offsetTop + deltaY}px`;
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handleDragEnd = () => {
//     setDragging(false);
//   };

//   return (
//     <div className="w-screen h-screen bg-[#cae4ef] flex">
//       {/* Sidebar */}
//       <Sidebar setTool={setTool} setCanvasSize={setCanvasSize} />

//       {/* Canvas Area */}
//       <div
//         id="canvas-container"
//         className="absolute"
//         onMouseDown={handleDragStart}
//         onMouseMove={handleDrag}
//         onMouseUp={handleDragEnd}
//         style={{
//           left: '50%',
//           top: '50%',
//           transform: 'translate(-50%, -50%)',
//           cursor: dragging ? 'grabbing' : 'grab'
//         }}
//       >
//         <canvas
//           ref={canvasRef}
//           width={canvasSize.width}
//           height={canvasSize.height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           className="border shadow-md bg-white"
//         ></canvas>
//       </div>
//     </div>
//   );
// }
// 'use client';

// import { useEffect, useRef } from 'react';
// import fabric from 'fabric/fabric-impl';

// export default function Canvas({ selectedTool, imageFile }) {
//   const canvasRef = useRef(null);
//   const fabricCanvas = useRef(null);
//   const drawingState = useRef({});

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: 800,
//       height: 600,
//       backgroundColor: 'white',
//     });
//     fabricCanvas.current = canvas;

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     const canvas = fabricCanvas.current;
//     if (!canvas) return;

//     canvas.isDrawingMode = false;
//     canvas.off('mouse:down');
//     canvas.off('mouse:move');
//     canvas.off('mouse:up');

//     let isDrawing = false;
//     let shape = null;

//     if (selectedTool === 'pen') {
//       canvas.isDrawingMode = true;
//       canvas.freeDrawingBrush.width = 2;
//       canvas.freeDrawingBrush.color = '#000000';
//     } else if (selectedTool === 'rect' || selectedTool === 'circle') {
//       canvas.on('mouse:down', (opt) => {
//         isDrawing = true;
//         const pointer = canvas.getPointer(opt.e);
//         const { x, y } = pointer;

//         if (selectedTool === 'rect') {
//           shape = new fabric.Rect({
//             left: x,
//             top: y,
//             width: 0,
//             height: 0,
//             fill: 'rgba(0,0,255,0.3)',
//             stroke: 'blue',
//             strokeWidth: 2,
//             selectable: false,
//           });
//         } else if (selectedTool === 'circle') {
//           shape = new fabric.Circle({
//             left: x,
//             top: y,
//             radius: 0,
//             fill: 'rgba(255,0,0,0.3)',
//             stroke: 'red',
//             strokeWidth: 2,
//             selectable: false,
//           });
//         }

//         drawingState.current = { startX: x, startY: y, shape };
//         canvas.add(shape);
//       });

//       canvas.on('mouse:move', (opt) => {
//         if (!isDrawing || !shape) return;
//         const pointer = canvas.getPointer(opt.e);
//         const { startX, startY } = drawingState.current;

//         if (selectedTool === 'rect') {
//           shape.set({
//             width: Math.abs(pointer.x - startX),
//             height: Math.abs(pointer.y - startY),
//             left: Math.min(pointer.x, startX),
//             top: Math.min(pointer.y, startY),
//           });
//         } else if (selectedTool === 'circle') {
//           const radius = Math.sqrt(Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)) / 2;
//           shape.set({
//             radius: radius,
//             left: (pointer.x + startX) / 2 - radius,
//             top: (pointer.y + startY) / 2 - radius,
//           });
//         }

//         canvas.renderAll();
//       });

//       canvas.on('mouse:up', () => {
//         isDrawing = false;
//         shape.set({ selectable: true }); // allow selection after draw
//         shape = null;
//       });
//     } else if (selectedTool === 'save') {
//       const link = document.createElement('a');
//       link.download = 'drawing.png';
//       link.href = canvas.toDataURL({ format: 'png' });
//       link.click();
//     }

//   }, [selectedTool]);

//   useEffect(() => {
//     if (imageFile && fabricCanvas.current) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         fabric.Image.fromURL(e.target.result, (img) => {
//           img.set({
//             left: 100,
//             top: 100,
//             scaleX: 0.5,
//             scaleY: 0.5,
//             selectable: true,
//           });
//           fabricCanvas.current.add(img);
//         });
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   return (
//     <div className="bg-white border shadow-md p-2 rounded">
//       <canvas ref={canvasRef} />
//     </div>
//   );
// }
