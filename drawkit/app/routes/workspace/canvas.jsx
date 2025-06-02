// pen drawing properly, canvas not moving
// 'use client';

// import { useRef, useEffect, useState } from 'react';

// export default function Canvas({ tool, imageFile }) {
//   const canvasRef = useRef(null);
//   const lastPos = useRef({ x: 0, y: 0 });
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     if (tool === 'save') {
//       const link = document.createElement('a');
//       link.download = 'canvas.png';
//       link.href = canvasRef.current.toDataURL('image/png');
//       link.click();
//     }
//   }, [tool]);

//   useEffect(() => {
//     if (imageFile && canvasRef.current) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const ctx = canvasRef.current.getContext('2d');
//         const img = new Image();
//         img.onload = () => ctx.drawImage(img, 100, 100, 200, 200);
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const ctx = canvas.getContext('2d');

//     if (tool === 'pen') {
//       setIsDrawing(true);
//       lastPos.current = { x, y };
//     } else if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, 100, 80);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2);
//       ctx.fill();
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
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     lastPos.current = { x, y };
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return ( 
//     <div className="flex-1 flex justify-center items-center bg-white  "> 
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         className="border shadow"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//     </div>
//   );
// }

// //canvas moving / zoommable
// 'use client';

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
//     if (tool === 'pen') {
//       setIsDrawing(true);
//       lastPos.current = { x, y };
//     } else if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, 100, 80);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2);
//       ctx.fill();
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


// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { Rnd } from 'react-rnd';

// export default function CanvasEditor({ tool, imageFile }) {
//   const canvasRef = useRef(null);
//   const lastPos = useRef({ x: 0, y: 0 });
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [framePos, setFramePos] = useState({ x: 100, y: 100 });
//   const size = { width: 1000, height: 600 };

//   useEffect(() => {
//     const centerX = window.innerWidth / 2 - size.width / 2;
//     const centerY = window.innerHeight / 2 - size.height / 2;
//     setFramePos({ x: centerX, y: centerY });
//   }, []);

//   useEffect(() => {
//     if (tool === 'save' && canvasRef.current) {
//       const link = document.createElement('a');
//       link.download = 'canvas.png';
//       link.href = canvasRef.current.toDataURL('image/png');
//       link.click();
//     }
//   }, [tool]);

//   useEffect(() => {
//     if (imageFile && canvasRef.current) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const ctx = canvasRef.current.getContext('2d');
//           ctx.drawImage(img, 100, 100, 200, 200);
//         };
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     if (tool === 'pen') return;

//     const zoomIntensity = 0.1;
//     const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
//     setZoom(prev => Math.max(0.3, Math.min(3, prev * delta)));
//   };

//   const getCanvasCoords = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: (e.clientX - rect.left) * (canvas.width / rect.width),
//       y: (e.clientY - rect.top) * (canvas.height / rect.height)
//     };
//   };

//   const handleMouseDown = (e) => {
//     const { x, y } = getCanvasCoords(e);
//     const ctx = canvasRef.current.getContext('2d');

//     if (tool === 'pen') {
//       setIsDrawing(true);
//       lastPos.current = { x, y };
//     } else if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, 100, 80);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== 'pen') return;
//     const { x, y } = getCanvasCoords(e);
//     const ctx = canvasRef.current.getContext('2d');
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     lastPos.current = { x, y };
//   };

//   const handleMouseUp = () => setIsDrawing(false);

//   return (
//     <Rnd
//       size={{ width: size.width * zoom, height: size.height * zoom }}
//       position={framePos}
//       onDragStop={(e, d) => setFramePos({ x: d.x, y: d.y })}
//       enableResizing={false}
//     >
//       <div
//         onWheel={handleWheel}
//         className="overflow-hidden relative"
//         style={{ background: 'white', width: '100%', height: '100%' }}
//       >
//         <canvas
//           ref={canvasRef}
//           width={size.width}
//           height={size.height}
//           style={{
//             width: `${size.width * zoom}px`,
//             height: `${size.height * zoom}px`,
//             display: 'block',
//             cursor: tool === 'pen' ? 'crosshair' : 'default',
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         />
//       </div>
//     </Rnd>
//   );
// }

// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { Rnd } from 'react-rnd';

// export default function CanvasEditor({ tool, imageFile }) {
//   const canvasRef = useRef(null);
//   const lastPos = useRef({ x: 0, y: 0 });
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [framePos, setFramePos] = useState({ x: 100, y: 100 });

//   const size = { width: 1000, height: 600 };

//   // Center the canvas frame on mount
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const centerX = window.innerWidth / 2 - size.width / 2;
//       const centerY = window.innerHeight / 2 - size.height / 2;
//       setFramePos({ x: centerX, y: centerY });
//     }
//   }, []);

//   // Save canvas to PNG
//   useEffect(() => {
//     if (tool === 'save' && canvasRef.current) {
//       const link = document.createElement('a');
//       link.download = 'canvas.png';
//       link.href = canvasRef.current.toDataURL('image/png');
//       link.click();
//     }
//   }, [tool]);

//   // Insert image
//   useEffect(() => {
//     if (imageFile && canvasRef.current) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const ctx = canvasRef.current.getContext('2d');
//           ctx.save();
//           ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
//           ctx.scale(zoom, zoom);
//           ctx.drawImage(img, 100, 100, 200, 200);
//           ctx.restore();
//         };
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   }, [imageFile]);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const zoomIntensity = 0.1;
//     const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
//     setZoom((prevZoom) => Math.max(0.3, Math.min(3, prevZoom * delta)));
//   };

//   const getCanvasCoords = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: (e.clientX - rect.left) / zoom,
//       y: (e.clientY - rect.top) / zoom,
//     };
//   };

//   const handleMouseDown = (e) => {
//     const { x, y } = getCanvasCoords(e);
//     const ctx = canvasRef.current.getContext('2d');

//     ctx.save();
//     ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transform
//     ctx.scale(zoom, zoom);

//     if (tool === 'pen') {
//       setIsDrawing(true);
//       lastPos.current = { x, y };
//     } else if (tool === 'rect') {
//       ctx.fillStyle = '#444';
//       ctx.fillRect(x, y, 100, 80);
//     } else if (tool === 'circle') {
//       ctx.fillStyle = '#888';
//       ctx.beginPath();
//       ctx.arc(x, y, 40, 0, Math.PI * 2);
//       ctx.fill();
//     }

//     ctx.restore();
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing || tool !== 'pen') return;
//     const { x, y } = getCanvasCoords(e);
//     const ctx = canvasRef.current.getContext('2d');

//     ctx.save();
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.scale(zoom, zoom);
//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.restore();

//     lastPos.current = { x, y };
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return (
//     <Rnd
//       size={{ width: size.width, height: size.height }}
//       position={framePos}
//       onDragStop={(e, d) => setFramePos({ x: d.x, y: d.y })}
//       enableResizing={false}
//       bounds="window"
//       className="border shadow-md bg-white"
//     >
//       <div
//         onWheel={handleWheel}
//         className="w-full h-full overflow-hidden"
//         style={{ position: 'relative' }}
//       >
//         <canvas
//           ref={canvasRef}
//           width={size.width}
//           height={size.height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           style={{
//             width: '100%',
//             height: '100%',
//             display: 'block',
//             cursor: tool === 'pen' ? 'crosshair' : 'default',
//           }}
//         />
//       </div>
//     </Rnd>
//   );
// }

'use client';

import { useRef, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

export default function CanvasEditor({ tool, imageFile }) {
  const canvasRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [framePos, setFramePos] = useState({ x: 100, y: 100 });

  const size = { width: 1000, height: 600 };

  useEffect(() => {
    const centerX = window.innerWidth / 2 - size.width / 2;
    const centerY = window.innerHeight / 2 - size.height / 2;
    setFramePos({ x: centerX, y: centerY });
  }, []);

  useEffect(() => {
    if (tool === 'save' && canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  }, [tool]);

  useEffect(() => {
    if (imageFile && canvasRef.current) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvasRef.current.getContext('2d');
          ctx.drawImage(img, 100, 100, 200, 200);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const delta = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext('2d');

    if (tool === 'pen') {
      setIsDrawing(true);
      lastPos.current = { x, y };
    } else if (tool === 'rect') {
      ctx.fillStyle = '#444';
      ctx.fillRect(x, y, 100, 80);
    } else if (tool === 'circle') {
      ctx.fillStyle = '#888';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || tool !== 'pen') return;

    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext('2d');

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={framePos}
      onDragStop={(e, d) => setFramePos({ x: d.x, y: d.y })}
      enableResizing={false}
      bounds="window"
      className="border shadow-md bg-white"
    >
      <div
        onWheel={handleWheel}
        className="w-full h-full overflow-hidden"
        style={{
          position: 'relative',
          transform: `scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        <canvas
          ref={canvasRef}
          width={size.width}
          height={size.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            cursor: tool === 'pen' ? 'crosshair' : 'default',
          }}
        />
      </div>
    </Rnd>
  );
}
