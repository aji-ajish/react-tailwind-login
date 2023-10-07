import React, { useReducer, useEffect } from "react";
import {
  FiMail,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

const signupController = (preState, action) => {
  switch (action.type) {
    case "USEREMAIL":
      return { ...preState, userEmail: action.payload };
    case "USERPASSWORD":
      return { ...preState, userPassword: action.payload };
    case "USEREMAILERROR":
      return { ...preState, userEmailError: action.payload };
    case "USERPASSWORDERROR":
      return { ...preState, userPasswordError: action.payload };
    case "SHOWPASSWORD":
      return { ...preState, showPassword: action.payload };
      case "ISLOADING":
      return { ...preState, isLoading: action.payload };
    default:
      break;
  }
};

export default function Signup() {

  const initialState = {
    userEmail: "",
    userPassword: "",
    isLoading: false,
    userEmailError: false,
    userPasswordError: false,
    showPassword: false,
  };
  const [state, dispatcher] = useReducer(signupController, initialState);


  const userEmailHandler = (e) => {
    dispatcher({ type: "USEREMAIL", payload: e.target.value });
  };

  const userPasswordHandler = (e) => {
    dispatcher({ type: "USERPASSWORD", payload: e.target.value });
  };


  const handelLogin = (e) => {
    e.preventDefault();
    console.log(state.usernameError)
    if (!state.userEmailError &&  !state.userPasswordError) {
      
      dispatcher({ type: "ISLOADING", payload: true });
      setTimeout(() => {
        const formData = {
          userEmail: state.userEmail,
          userPassword: state.userPassword,
        };
        
        dispatcher({ type: "ISLOADING", payload: false });
      }, 1000);

    }

  };

  const handleLoginButton = () => {

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmail.test(state.userEmail)) {
      dispatcher({ type: "USEREMAILERROR", payload: false });
    } else {
      dispatcher({ type: "USEREMAILERROR", payload: true });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/;
    if (passwordRegex.test(state.userPassword)) {
      dispatcher({ type: "USERPASSWORDERROR", payload: false });
    } else {
      dispatcher({ type: "USERPASSWORDERROR", payload: true });
    }
  }

  const isFormValid = () => {
    return  state.userEmail !== ''  && state.userPassword !== '';
  };

  const togglePasswordVisible = () => {
    const passwordToggle = state.showPassword;
    dispatcher({ type: "SHOWPASSWORD", payload: !(passwordToggle) });
  }
  return (
    <div className="absolute">
      <form
        autoComplete="off"
        onSubmit={handelLogin}
        className="flex flex-col pt-3"
      >

        <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
          <FiMail className="absolute" />
          <input
            type="text"
            className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
            placeholder="Enter your email"
            value={state.userEmail}
            onChange={userEmailHandler}
          />
          <p className="absolute  text-sm pl-20 mt-12 text-red-500">{state.userEmailError ? 'enter valid email' : ''}</p>
        </div>

        <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
          <FiLock className="absolute" />
          <input
            type={state.showPassword ? 'text' : 'password'}
            className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
            placeholder="Enter your password"
            value={state.userPassword}
            onChange={userPasswordHandler}
          />
          <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.userPasswordError ? 'enter valid password' : ''}</p>

          <div className=" flex items-center absolute ml-72" onClick={togglePasswordVisible}>
            {
              state.showPassword ? (<FiEye className="relative" />) : (<FiEyeOff className="absolute" />)
            }
          </div>
        </div>
        <div className="">
          <input type="submit" value={`${state.isLoading ? 'Loading ...' : 'Login'}`} className={`${!isFormValid() ? 'cursor-no-drop bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50' : 'cursor-pointer bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500'}  mx-auto text-2xl flex items-center py-2 my-3  text-slate-200  w-48 justify-center rounded-full space-x-3 overflow-hidden`} disabled={!isFormValid()} onClick={handleLoginButton} />

        </div>
        <div className="mx-auto text-2xl flex items-center py-3 text-slate-200">
          <p className="text-base">
            Not a member? <span className="text-lg">Signup</span>
          </p>
        </div>
      </form>
    </div>
  );
}
