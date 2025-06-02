'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from "./sidebar";
import CanvasEditor from './canvas';

function WorkspaceLayout({ children }) {
  const [tool, setTool] = useState('pen');
  const [imageFile, setImageFile] = useState(null);

  const handleToolSelect = (tool) => {
    console.log('Tool selected:', tool);
    setTool(tool); 
  };

  const handleImageUpload = (file) => {
    console.log('Image file uploaded:', file);
    setImageFile(file);
  };

  return (
    <div > 
      <Header />
      <Sidebar onToolSelect={handleToolSelect} setImageFile={handleImageUpload} />
      
      <CanvasEditor tool={tool} imageFile={imageFile} />
      {children}
    </div>
  );
}

export default WorkspaceLayout;
