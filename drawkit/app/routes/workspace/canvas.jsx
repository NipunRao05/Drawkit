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
