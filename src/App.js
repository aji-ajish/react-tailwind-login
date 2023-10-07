
import ToggleButton from "./ToggleButton";
import Signup from "./Signup";
import Login from "./Login";

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
      <div className="h-fit w-fit border bg-green-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50  px-7 py-12" >
        <ToggleButton />
          <Login/>
          <Signup/>
      </div>
    </div>
  );
}

export default App;
