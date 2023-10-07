import React, { useReducer, useEffect } from "react";
import {
  FiMail,
  FiPhoneCall,
  FiUser,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

const signupController = (preState, action) => {
  switch (action.type) {
    case "USERNAME":
      return { ...preState, userName: action.payload };
    case "USEREMAIL":
      return { ...preState, userEmail: action.payload };
    case "USERPHONE":
      return { ...preState, userPhone: action.payload };
    case "USERPASSWORD":
      return { ...preState, userPassword: action.payload };
    case "USERNAMEERROR":
      return { ...preState, usernameError: action.payload };
    case "USEREMAILERROR":
      return { ...preState, userEmailError: action.payload };
    case "USERPHONEERROR":
      return { ...preState, userPhoneError: action.payload };
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
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    isLoading: false,
    usernameError: false,
    userEmailError: false,
    userPhoneError: false,
    userPasswordError: false,
    showPassword: false,
  };
  const [state, dispatcher] = useReducer(signupController, initialState);

  const userNameHandler = (e) => {
    dispatcher({ type: "USERNAME", payload: e.target.value });

  };
  const userEmailHandler = (e) => {
    dispatcher({ type: "USEREMAIL", payload: e.target.value });
  };
  const userPhoneHandler = (e) => {
    dispatcher({ type: "USERPHONE", payload: e.target.value });
  };
  const userPasswordHandler = (e) => {
    dispatcher({ type: "USERPASSWORD", payload: e.target.value });
  };


  const handelSignup = (e) => {
    e.preventDefault();
    console.log(state.usernameError)
    if (!state.usernameError && !state.userEmailError && !state.userPhoneError && !state.userPasswordError) {
      
      dispatcher({ type: "ISLOADING", payload: true });
      setTimeout(() => {
        const formData = {
          userName: state.userName,
          userEmail: state.userEmail,
          userPhone: state.userPhone,
          userPassword: state.userPassword,
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        dispatcher({ type: "ISLOADING", payload: false });
      }, 1000);

    }

  };

  const handleSignupButton = () => {
    if ((state.userName.length < 5)) {
      dispatcher({ type: "USERNAMEERROR", payload: true });
    } else {
      dispatcher({ type: "USERNAMEERROR", payload: false });
    }
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexEmail.test(state.userEmail)) {
      dispatcher({ type: "USEREMAILERROR", payload: false });
    } else {
      dispatcher({ type: "USEREMAILERROR", payload: true });
    }

    const regexPhone = /^\d{10}$/;
    if (regexPhone.test(state.userPhone)) {
      dispatcher({ type: "USERPHONEERROR", payload: false });
    } else {
      dispatcher({ type: "USERPHONEERROR", payload: true });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/;
    if (passwordRegex.test(state.userPassword)) {
      dispatcher({ type: "USERPASSWORDERROR", payload: false });
    } else {
      dispatcher({ type: "USERPASSWORDERROR", payload: true });
    }
  }

  const isFormValid = () => {
    return state.userName !== '' && state.userEmail !== '' && state.userPhone !== '' && state.userPassword !== '';
  };

  const togglePasswordVisible = () => {
    const passwordToggle = state.showPassword;
    dispatcher({ type: "SHOWPASSWORD", payload: !(passwordToggle) });
  }
  return (
    <div className="relative">
      <form
        autoComplete="off"
        onSubmit={handelSignup}
        className="flex flex-col pt-3"
      >
        <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
          <FiUser className="absolute" />
          <input
            type="text"
            className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
            placeholder="Enter your name"
            value={state.userName}
            onChange={userNameHandler}
          />
          <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.usernameError ? 'username at least 5 character' : ''}</p>
        </div>
        <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
          <FiMail className="absolute" />
          <input
            type="text"
            className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
            placeholder="Enter your email"
            value={state.userEmail}
            onChange={userEmailHandler}
          />
          <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.userEmailError ? 'enter valid email' : ''}</p>
        </div>
        <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
          <FiPhoneCall className="absolute" />
          <input
            type="text"
            className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
            placeholder="Enter your phone"
            value={state.userPhone}
            onChange={userPhoneHandler}
          />
          <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.userPhoneError ? 'enter valid phone number' : ''}</p>

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
          <p className="absolute text-sm mt-20 text-red-500">{state.userPasswordError ? 'At least one (lower & upper letter, digits, and specified special characters) minimum length of 8' : ''}</p>

          <div className=" flex items-center absolute ml-72" onClick={togglePasswordVisible}>
            {
              state.showPassword ? (<FiEye className="relative" />) : (<FiEyeOff className="absolute" />)
            }
          </div>
        </div>
        <div className="pt-5">
          <input type="submit" value={`${state.isLoading ? 'Registering ...' : 'Signup'}`} className={`${!isFormValid() ? 'cursor-no-drop bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50' : 'cursor-pointer bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500'}  mx-auto text-2xl flex items-center py-2 my-3  text-slate-200  w-48 justify-center rounded-full space-x-3 overflow-hidden`} disabled={!isFormValid()} onClick={handleSignupButton} />

        </div>
        <div className="mx-auto text-2xl flex items-center py-3 text-slate-200">
          <p className="text-base">
            Already a member? <span className="text-lg">Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}
