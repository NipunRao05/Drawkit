// 'use client';

// export default function Sidebar({ onToolSelect, setImageFile }) {
//   const handleImageUpload = (e) => {
//     if (e.target.files[0]) setImageFile(e.target.files[0]);
//   };

//   return (
//     <div className="w-60 bg-gray-100 h-full shadow-md p-5 space-y-4">
//       <h2 className="text-xl justify-center font-semibold"> Tools</h2>

//       {[
//         { label: '✏️ Pen', value: 'pen' },
//         { label: '⬛ Rectangle', value: 'rect' },
//         { label: '⚪ Circle', value: 'circle' },
//       ].map((tool) => (
//         <button
//           key={tool.value}
//           onClick={() => onToolSelect(tool.value)}
//           className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
//         >
//           {tool.label}
//         </button>
//       ))}

//       <button
//         onClick={() => onToolSelect('save')}
//         className="w-full px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
//       >
//         💾 Save
//       </button>

//       <label className="block w-full cursor-pointer bg-yellow-100 hover:bg-yellow-200 rounded px-4 py-2 text-center">
//         📷 Insert Image
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//       </label>
//     </div>
//   );
// }

'use client';

export default function Sidebar({ onToolSelect, setImageFile }) {
  const handleImageUpload = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  return (
    <div className="w-60 bg-gray-100 h-full shadow-md p-5 flex flex-col justify-center space-y-4">
      <h2 className="text-xl text-center font-semibold mb-4">Tools</h2>

      {[
        { label: '✏️ Pen', value: 'pen' },
        { label: '⬛ Rectangle', value: 'rect' },
        { label: '⚪ Circle', value: 'circle' },
      ].map((tool) => (
        <button
          key={tool.value}
          onClick={() => onToolSelect(tool.value)}
          className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
        >
          {tool.label}
        </button>
      ))}

      <button
        onClick={() => onToolSelect('save')}
        className="w-full px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
      >
        💾 Save
      </button>

      <label className="block w-full cursor-pointer bg-yellow-100 hover:bg-yellow-200 rounded px-4 py-2 text-center">
        📷 Insert Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
 
// "use client";

// import React from "react";

// export default function Sidebar() {
//   return (
//     <div className="w-56 bg-white p-4 flex flex-col justify-center rounded gap-4 shadow-md">
//       <h2 className="text-lg font-bold text-center">Tools</h2>
//       <button class="rounded"
//         onClick={() => localStorage.setItem("tool", "pen")}
//         className="bg-blue-100 py-2 rounded"
//       >
//         🖊️ Pen
//       </button>
//       <button
//         onClick={() => localStorage.setItem("tool", "rect")}
//         className="bg-gray-800 text-white py-2 rounded"
//       >
//         ▭ Rectangle
//       </button>
//       <button
//         onClick={() => localStorage.setItem("tool", "circle")}
//         className="bg-purple-100 py-2 rounded"
//       >
//         ⚪ Circle
//       </button>
//       <button
//         onClick={() => {
//           const canvas = document.querySelector("canvas");
//           const link = document.createElement("a");
//           link.download = "canvas.png";
//           link.href = canvas.toDataURL();
//           link.click();
//         }}
//         className="bg-green-200 py-2 rounded"
//       >
//         💾 Save
//       </button>
//       <label className="bg-yellow-100 py-2 rounded text-center cursor-pointer">
//         📷 Insert Image
//         <input
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (!file) return;
//             const img = new Image();
//             img.onload = () => {
//               const canvas = document.querySelector("canvas");
//               const ctx = canvas.getContext("2d");
//               ctx.drawImage(img, 0, 0);
//             };
//             img.src = URL.createObjectURL(file);
//           }}
//         />
//       </label>
//     </div>
//   );
// }
// "use client";  //(manual adjuster)
// import React from "react";

// export default function Sidebar({ setTool, setCanvasSize }) {
//   return (
//     <div className="w-56 bg-white p-4 flex flex-col justify-center gap-4 shadow-md">
//       <h2 className="text-lg font-bold text-center">Tools</h2>
//       <button onClick={() => setTool("pen")} className="bg-blue-100 py-2 rounded">🖊️ Pen</button>
//       <button onClick={() => setTool("rect")} className="bg-gray-800 text-white py-2 rounded">▭ Rectangle</button>
//       <button onClick={() => setTool("circle")} className="bg-purple-100 py-2 rounded">⚪ Circle</button>
//       <button onClick={() => {
//         const link = document.createElement('a');
//         link.download = 'canvas.png';
//         link.href = canvasRef.current.toDataURL();
//         link.click();
//       }} className="bg-green-200 py-2 rounded">💾 Save</button>
//       <label className="bg-yellow-100 py-2 rounded text-center cursor-pointer">
//         📷 Insert Image
//         <input type="file" accept="image/*" hidden onChange={(e) => {
//           const file = e.target.files[0];
//           if (!file) return;
//           const img = new Image();
//           img.onload = () => {
//             const ctx = canvasRef.current.getContext("2d");
//             ctx.drawImage(img, 0, 0);
//           };
//           img.src = URL.createObjectURL(file);
//         }} />
//       </label>
//       <div className="flex flex-col">
//         <label className="text-sm">Canvas Width:</label>
//         <input type="number" onChange={(e) => setCanvasSize((prev) => ({ ...prev, width: e.target.value }))} className="border rounded p-1" />
//         <label className="text-sm">Canvas Height:</label>
//         <input type="number" onChange={(e) => setCanvasSize((prev) => ({ ...prev, height: e.target.value }))} className="border rounded p-1" />
//       </div>
//     </div>
//   );
// }

// 'use client';

// export default function Sidebar({ onToolSelect, setImageFile }) {
//   const handleImageUpload = (e) => {
//     if (e.target.files[0]) setImageFile(e.target.files[0]);
//   };

//   return (
//     <div className="w-60 h-full bg-white shadow-md flex items-center justify-center">
//       <div className="p-5 flex flex-col space-y-4 w-full">
//         <h2 className="text-xl text-center font-semibold mb-2">Tools</h2>

//         {[
//           { label: '🖊️ Pen', value: 'pen' },
//           { label: '⬛ Rectangle', value: 'rect' },
//           { label: '⚪ Circle', value: 'circle' },
//         ].map((tool) => (
//           <button
//             key={tool.value}
//             onClick={() => onToolSelect(tool.value)}
//             className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-left"
//           >
//             {tool.label}
//           </button>
//         ))}

//         <button
//           onClick={() => onToolSelect('save')}
//           className="w-full px-4 py-2 bg-green-200 hover:bg-green-300 rounded text-left"
//         >
//           💾 Save
//         </button>

//         <label className="block w-full cursor-pointer bg-yellow-100 hover:bg-yellow-200 rounded px-4 py-2 text-left">
//           📷 Insert Image
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// 'use client';

// export default function Sidebar({ onToolSelect, setImageFile }) {
//   const handleImageUpload = (e) => {
//     if (e.target.files[0]) setImageFile(e.target.files[0]);
//   };

//   return (
//     <div className="w-60 h-screen bg-white shadow-md flex items-center justify-center">
//       <div className="p-5 flex flex-col space-y-5 w-full">
//         <h2 className="text-xl text-center font-semibold mb-2">Tools</h2>

//         {[
//           { label: '🖊️ Pen', value: 'pen' },
//           { label: '⬛ Rectangle', value: 'rect' },
//           { label: '⚪ Circle', value: 'circle' },
//         ].map((tool) => (
//           <button
//             key={tool.value}
//             onClick={() => onToolSelect(tool.value)}
//             className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-left"
//           >
//             {tool.label}
//           </button>
//         ))}

//         <button
//           onClick={() => onToolSelect('save')}
//           className="w-full px-4 py-2 bg-green-200 hover:bg-green-300 rounded text-left"
//         >
//           💾 Save
//         </button>

//         <label className="block w-full cursor-pointer bg-yellow-100 hover:bg-yellow-200 rounded px-4 py-2 text-left">
//           📷 Insert Image
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

