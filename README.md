Drawkit   
A web-based drawing application built using nextjs, react and react-rnd provided with a sinmple canvas editor along with edotor tools such as pen, rectangle, circle, image insertion, and save.

Project Structure

drawkit/   
├── app/     
│ └── routes/
│ └── workspace/    
│ ├── components/     
│ ├── canvas.jsx //Contains the code for canvas and all features    
│ │── Header.jsx // Top navigation bar   
│ │── layout.jsx //Contains Main layout (Header + Sidebar + Canvas)   
│ └── sidebar.jsx //Tools (pen, rect, circle, save, upload)   
│ └── page.jsx   
.   
.   

Visit review branch for the final/updated version

Clone Repository - (on bash) git clone https://github.com/your-username/drawkit.git cd drawkit

Install Dependency - npm install npm install react-rnd

Run the Development Server - npm run dev

visit :- http://localhost:3000/routes/workspace

Rooting path(for understanding) - drawkit/app/routes/workspace/..

