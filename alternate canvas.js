
// "use client";

// import React, { useRef, useState, useEffect } from "react";

// export default function CanvasArea() {
//   const canvasRef = useRef(null);
//   const [tool, setTool] = useState("pen");
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragging, setDragging] = useState();
//   const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 600 });
//   const [rectSize, setRectSize] = useState({ width: 100, height: 80 });
//   const [circleRadius, setCircleRadius] = useState(40);

//   useEffect(() => {
//     const toolSetting = localStorage.getItem("tool");
//     if (toolSetting) setTool(toolSetting);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tool", tool);
//   }, [tool]);

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
//       ctx.fillRect(x, y, rectSize.width, rectSize.height);
//       setIsDrawing(false);
//     } else if (tool === "circle") {
//       ctx.fillStyle = "#888";
//       ctx.beginPath();
//       ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
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
//     <div
//       id="canvas-container"
//       className="absolute"
//       onMouseDown={handleDragStart}
//       onMouseMove={handleDrag}
//       onMouseUp={handleDragEnd}
//       style={{
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//         cursor: dragging ? "grabbing" : "grab",
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={canvasSize.width}
//         height={canvasSize.height}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         className="border shadow-md bg-white"
//       ></canvas>
//     </div>
//   );
// }

//(not zooming)
// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import { Rnd } from 'react-rnd';

// export default function CanvasArea() {
//   const canvasRef = useRef(null);
//   const [tool, setTool] = useState('pen');
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [size, setSize] = useState({ width: 1000, height: 600 });
//   const [circleRadius] = useState(40);
//   const [rectSize] = useState({ width: 100, height: 80 });
//   const [zoom, setZoom] = useState(1);

//   useEffect(() => {
//     const storedTool = localStorage.getItem('tool');
//     if (storedTool) setTool(storedTool);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tool', tool);
//   }, [tool]);

//   const handleWheel = (e) => {
//   e.preventDefault();
//   const zoomIntensity = 0.1;
//   const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
//   let newZoom = zoom * delta;

//   // Clamp zoom level
//   newZoom = Math.max(0.3, Math.min(3, newZoom));
//   setZoom(newZoom);
// };

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setIsDrawing(true);
//     setPosition({ x, y });

//     const ctx = canvas.getContext('2d');
//     if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, rectSize.width, rectSize.height);
//       setIsDrawing(false);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
//       ctx.fill();
//       setIsDrawing(false);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== 'pen') return;
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const ctx = canvas.getContext('2d');
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     ctx.moveTo(position.x, position.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setPosition({ x, y });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return (
//     <Rnd
//       default={{
//         x: window.innerWidth / 2 - size.width / 2,
//         y: window.innerHeight / 2 - size.height / 2,
//         width: size.width,
//         height: size.height,
//       }}
//       bounds="window"
//       minWidth={300}
//       minHeight={200}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         setSize({
//           width: parseInt(ref.style.width),
//           height: parseInt(ref.style.height),
//         });
//       }}

//       dragHandleClassName="drag-handle cursor-move"
//       className="border bg-white shadow-lg"
//     >
//       <canvas
//         ref={canvasRef}
//         width={size.width}
//         height={size.height}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{
//           transform: `scale(${zoom})`,
//           transformOrigin: '0 0',
//       }}

//         className="w-full h-full"
//       />
//     </Rnd>
//   );
// }

// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import { Rnd } from 'react-rnd';

// export default function CanvasEditor({ tool, imageFile }) {
//   const canvasRef = useRef(null);
//   // const [tool, setTool] = useState('pen');
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 }); // drawing position
//   const [zoom, setZoom] = useState(1);
//   const [framePos, setFramePos] = useState({ x: 100, y: 100 }); // frame position
//   const [size, setSize] = useState({ width: 1000, height: 600 });
//   const [circleRadius] = useState(40);
//   const [rectSize] = useState({ width: 100, height: 80 });


//   // Center frame on mount
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const centerX = window.innerWidth / 2 - size.width / 2;
//       const centerY = window.innerHeight / 2 - size.height / 2;
//       setFramePos({ x: centerX, y: centerY });
//     }
//   }, [size]);

//   useEffect(() => {
//     const storedTool = localStorage.getItem('tool');
//     if (storedTool) setTool(storedTool);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tool', tool);
//   }, [tool]);

//   useEffect(() => {
//   if (tool === 'save') {
//     const link = document.createElement('a');
//     link.download = 'canvas.png';
//     link.href = canvasRef.current.toDataURL('image/png');
//     link.click();
//   }
// }, [tool]);


//   const handleWheel = (e) => {
//     e.preventDefault();
//     const zoomIntensity = 0.1;
//     const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
//     let newZoom = zoom * delta;
//     newZoom = Math.max(0.3, Math.min(3, newZoom)); // Clamp
//     setZoom(newZoom);
//   };

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / zoom;
//     const y = (e.clientY - rect.top) / zoom;
//     setIsDrawing(true);
//     setPosition({ x, y });

//     const ctx = canvas.getContext('2d');
//     if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, rectSize.width, rectSize.height);
//       setIsDrawing(false);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
//       ctx.fill();
//       setIsDrawing(false);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== 'pen') return;
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / zoom;
//     const y = (e.clientY - rect.top) / zoom;
//     const ctx = canvas.getContext('2d');
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     ctx.moveTo(position.x, position.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setPosition({ x, y });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return (
//     <Rnd >
//   <div
//     onWheel={handleWheel}
//     className="w-full h-full overflow-auto relative"
//     style={{
//       background: 'white',
//       position: 'relative',
//     }}
//   >
//     <div
//       style={{
//         transform: `scale(${zoom})`,
//         transformOrigin: 'top left',
//         width: `${size.width}px`,
//         height: `${size.height}px`,
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         width={size.width}
//         height={size.height}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         className="w-full h-full"
//         style={{
//           display: 'block',
//         }}
//       />
//     </div>
//   </div>
// </Rnd>


//   );
// }
'use client';

import { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';

export default function CanvasEditor({ tool, imageFile }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [framePos, setFramePos] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 1000, height: 600 });
  const [circleRadius] = useState(40);
  const [rectSize] = useState({ width: 100, height: 80 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const centerX = window.innerWidth / 2 - size.width / 2;
      const centerY = window.innerHeight / 2 - size.height / 2;
      setFramePos({ x: centerX, y: centerY });
    }
  }, [size]);

  useEffect(() => {
    localStorage.setItem('tool', tool);
  }, [tool]);

  useEffect(() => {
    if (tool === 'save') {
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  }, [tool]);

  const handleWheel = (e) => {
    e.preventDefault();
    if (tool === 'pen') return
    const zoomIntensity = 0.1;
    const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
    let newZoom = zoom * delta;
    newZoom = Math.max(0.3, Math.min(3, newZoom));
    setZoom(newZoom);
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    setIsDrawing(true);
    setPosition({ x, y });

    const ctx = canvas.getContext('2d');
    if (tool === 'rect') {
      ctx.fillStyle = '#444';
      ctx.fillRect(x, y, rectSize.width, rectSize.height);
      setIsDrawing(false);
    } else if (tool === 'circle') {
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      setIsDrawing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || tool !== 'pen') return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    // const lastPosRef = useRef({ x: 0, y: 0 });
    // lastPosRef.current = { x, y };
    // ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);


  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Rnd>
      <div
        onWheel={handleWheel}
        className="w-full h-full overflow-auto relative"
        style={{ background: 'white' }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            width: `${size.width}px`,
            height: `${size.height}px`,
            pointerEvents: tool ==='pen'?'auto':'none'  

          }}
        >
          <canvas
            ref={canvasRef}
            width={size.width}
            height={size.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-full"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </Rnd>
  );
}



// 'use client'; //     (faulty)

// import { useRef, useState, useEffect } from 'react';
// import { Rnd } from 'react-rnd';

// export default function CanvasEditor({ tool, imageFile }) {
//   const canvasRef = useRef(null);
//   const lastPosRef = useRef({ x: 0, y: 0 }); // NEW
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [framePos, setFramePos] = useState({ x: 100, y: 100 });
//   const [size, setSize] = useState({ width: 1000, height: 600 });
//   const [circleRadius] = useState(40);
//   const [rectSize] = useState({ width: 100, height: 80 });

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const centerX = window.innerWidth / 2 - size.width / 2;
//       const centerY = window.innerHeight / 2 - size.height / 2;
//       setFramePos({ x: centerX, y: centerY });
//     }
//   }, [size]);

//   useEffect(() => {
//     localStorage.setItem('tool', tool);
//   }, [tool]);

//   useEffect(() => {
//     if (tool === 'save') {
//       const link = document.createElement('a');
//       link.download = 'canvas.png';
//       link.href = canvasRef.current.toDataURL('image/png');
//       link.click();
//     }
//   }, [tool]);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     if (tool === 'pen') return;
//     const zoomIntensity = 0.1;
//     const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
//     let newZoom = zoom * delta;
//     newZoom = Math.max(0.3, Math.min(3, newZoom));
//     setZoom(newZoom);
//   };

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / zoom;
//     const y = (e.clientY - rect.top) / zoom;
//     setIsDrawing(true);
//     lastPosRef.current = { x, y };

//     const ctx = canvas.getContext('2d');
//     if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, rectSize.width, rectSize.height);
//       setIsDrawing(false);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
//       ctx.fill();
//       setIsDrawing(false);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== 'pen') return;
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / zoom;
//     const y = (e.clientY - rect.top) / zoom;

//     const ctx = canvas.getContext('2d');
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();

//     lastPosRef.current = { x, y };
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return (
//     <Rnd
//       size={size}
//       position={framePos}
//       onDragStop={(e, d) => setFramePos({ x: d.x, y: d.y })}
//       enableResizing={false}
//     >
//       <div
//         onWheel={handleWheel}
//         className="w-full h-full overflow-auto relative"
//         style={{ background: 'white' }}
//       >
//         <div
//           style={{
//             transform: `scale(${zoom})`,
//             transformOrigin: 'center', // CHANGED from 'top left'
//             width: `${size.width}px`,
//             height: `${size.height}px`,
//             pointerEvents: tool === 'pen' ? 'auto' : 'none',
//           }}
//         >
//           <canvas
//             ref={canvasRef}
//             width={size.width}
//             height={size.height}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             className="w-full h-full"
//             style={{ display: 'block' }}
//           />
//         </div>
//       </div>
//     </Rnd>
//   );
// }
