import React from 'react'
import Header from './Header';
import Sidebar from "./sidebar";
import CanvasEditor from './canvas';

function WorkspaceLayout({children}){
    return (
        
        <div>
            <Header/>
            <Sidebar/> 
            <CanvasEditor />
            {children}</div>

    );
}

export default WorkspaceLayout;