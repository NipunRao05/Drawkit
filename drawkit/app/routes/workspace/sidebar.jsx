

'use client';

export default function Sidebar({ onToolSelect, setImageFile }) {

    const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };



  return (
    <div className="w-70 h-screen bg-gray-100 shadow-md flex flex-col">
      <div className="my-auto p-7 flex flex-col items-center space-y-6">
        <h2 className="text-2xl text-center font-semibold mb-2">Tools</h2>

      {[
        { label: ' Pen', value: 'pen' },
        { label: ' Rectangle', value: 'rect' },
        { label: ' Circle', value: 'circle' },
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
  </div>
  );
}
