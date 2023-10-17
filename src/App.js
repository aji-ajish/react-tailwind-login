import React from 'react';
import { BrowserRouter, Route,Routes  } from 'react-router-dom';
import ToggleButton from "./ToggleButton";
import DashBoard from "./DashBoard";
import bgImage from './backgroundImage.jpg'



function App() {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment:'fixed',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%',
        height:'100vh'
        
      }}
    >
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<ToggleButton />}></Route> 
        <Route path='dashboard' element={<DashBoard />}></Route> 
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
