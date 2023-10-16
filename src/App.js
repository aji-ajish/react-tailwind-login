import React from 'react';
import { BrowserRouter, Route,Routes  } from 'react-router-dom';
import ToggleButton from "./ToggleButton";
import DashBoard from "./DashBoard";


function App() {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/featured/ultra-hd-wazf67lzyh5q7k32.jpg')`,
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
