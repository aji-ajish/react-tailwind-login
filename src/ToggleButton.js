import React, { useRef, useState } from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import Signup from "./Signup";
import Login from "./Login";

export default function ToggleButton() {
  const toogle_btn = useRef(null);
  const loginButton = useRef(null);
  const signupButton = useRef(null);
  const [loginFormClass, setLoginFormClass] = useState(true)

  const loginBtnClick = () => {
    toogle_btn.current.classList.add('left-0')
    toogle_btn.current.classList.remove('left-28')
    signupButton.current.classList.add('text-black')
    loginButton.current.classList.add('text-zinc-50')
    loginButton.current.classList.remove('text-black')
    setLoginFormClass(true)
  }
  const signupBtnClick = () => {
    toogle_btn.current.classList.add('left-28')
    toogle_btn.current.classList.remove('left-0')
    loginButton.current.classList.add('text-black')
    signupButton.current.classList.remove('text-black')
    setLoginFormClass(false)
  }
  return (
    <div className="h-630 w-fit border bg-green-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50  px-7 py-12" >
      <div className="flex justify-center">
        <div className="flex w-56 justify-center  h-10 items-center text-zinc-50 font-medium text-lg relative rounded-full  shadow-[inset_1px_1px_17px_1px_#edf2f7]">

          <div className="h-full w-28 left-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500  absolute rounded-full transition-all duration-700" ref={toogle_btn}></div>
          <button className="px-7 font-medium text-lg bg-transparent relative outline-none bottom-0 cursor-pointer transition-all duration-500" onClick={loginBtnClick} ref={loginButton}>Login</button>

          <button className="text-black px-7 font-medium text-lg bg-transparent relative outline-none bottom-0 cursor-pointer transition-all duration-500" onClick={signupBtnClick} ref={signupButton}>Signup</button>
        </div>
      </div>
      <div className="flex justify-center  text-yellow-50 py-4">
        <div className="text-2xl  p-2 rounded-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500 mx-2 cursor-pointer">
          <FiFacebook />
        </div>
        <div className="text-2xl  p-2 rounded-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500 mx-2 cursor-pointer">
          <FiInstagram />
        </div>
        <div className="text-2xl  p-2 rounded-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500 mx-2 cursor-pointer">
          <FiTwitter />
        </div>
      </div>
      <div className=''>{
        loginFormClass ?
          (<div className=''><Login loginData={"HI"}/></div>) : 
          (<div className=''><Signup loginBtnClick={loginBtnClick}  signupButton={signupButton}/></div>)
      }
      </div>
    </div>
  );
}
