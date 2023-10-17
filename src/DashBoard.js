import React, { useReducer, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiPhoneCall,
  FiUser,
  FiLock,
} from "react-icons/fi";

const profileEdit = (preState, action) => {
  switch (action.type) {
    case "ISEDITFORM":
      return { ...preState, isEditForm: action.payload };
    case "USERNAME":
      return { ...preState, userName: action.payload };
    case "USEREMAIL":
      return { ...preState, userEmail: action.payload };
    case "USERPHONE":
      return { ...preState, userPhone: action.payload };
    case "USERPASSWORD":
      return { ...preState, userPassword: action.payload };
    case "USERNEWPASSWORD":
      return { ...preState, userNewPassword: action.payload };
    case "USERNAMEERROR":
      return { ...preState, usernameError: action.payload };
    case "USEREMAILERROR":
      return { ...preState, userEmailError: action.payload };
    case "USERPHONEERROR":
      return { ...preState, userPhoneError: action.payload };
    case "USERPASSWORDERROR":
      return { ...preState, userPasswordError: action.payload };
    case "USERNEWPASSWORDERROR":
      return { ...preState, userNewPasswordError: action.payload };
    case "ISLOADING":
      return { ...preState, isLoading: action.payload };
    default:
      break;
  }
}

export default function DashBoard() {
  const [editUserData, setEditUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
  })
  const initialState = {
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: "",
    userNewPassword: "",
    isEditForm: false,
    isLoading: false,
    usernameError: false,
    userEmailError: false,
    userPhoneError: false,
    userPasswordError: false,
    userNewPasswordError: false,
  }
  const [state, dispatcher] = useReducer(profileEdit, initialState)

  const userName = editUserData.userName
  const userEmail = editUserData.userEmail
  const userPhone = editUserData.userPhone

  const navigate = useNavigate();

  const logoutHandel = () => {
    localStorage.removeItem("formData");
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('userPhone')
    navigate('/');
  }

  const editProfileHandel = () => {
    dispatcher({ type: 'ISEDITFORM', payload: true })
  }
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
  const userNewPasswordHandler = (e) => {
    dispatcher({ type: "USERNEWPASSWORD", payload: e.target.value });
  };

  const editFormHandle = (e) => {
    e.preventDefault();
    if (!state.usernameError && !state.userEmailError && !state.userPhoneError && !state.userPasswordError && !state.userNewPasswordError) {
      if (state.userPassword === editUserData.userPassword) {
        if (state.userPassword !== state.userNewPassword) {
          dispatcher({ type: "ISLOADING", payload: true });
          setTimeout(() => {
            const formData = {
              userName: (state.userName === '' ? editUserData.userName : state.userName.trim()),
              userEmail: (state.userEmail === '' ? editUserData.userEmail : state.userEmail.trim()),
              userPhone: (state.userPhone === '' ? editUserData.userPhone : state.userPhone.trim()),
              userPassword: (state.userPassword === '' ? editUserData.userPassword : state.userPassword.trim()),
            };
            localStorage.setItem("formData", JSON.stringify(formData));
            dispatcher({ type: 'ISEDITFORM', payload: false })
            dispatcher({ type: "ISLOADING", payload: false });
          }, 1000);
        } else {
          alert("current password and new password must be same")
        }
      }else if((state.userPassword==='') && (state.userNewPassword==='')){
        dispatcher({ type: "ISLOADING", payload: true });
        setTimeout(() => {
          const formData = {
            userName: (state.userName === '' ? editUserData.userName : state.userName.trim()),
            userEmail: (state.userEmail === '' ? editUserData.userEmail : state.userEmail.trim()),
            userPhone: (state.userPhone === '' ? editUserData.userPhone : state.userPhone.trim()),
            userPassword: editUserData.userPassword,
          };
          localStorage.setItem("formData", JSON.stringify(formData));
          dispatcher({ type: 'ISEDITFORM', payload: false })
          dispatcher({ type: "ISLOADING", payload: false });
        }, 1000);
      }
      else {
        alert("current password is wrong")
      }


    }
  }

  useEffect(() => {
    const editData = localStorage.getItem('formData');
    if (editData) {
      const parsedData = JSON.parse(editData);
      const { userName, userEmail, userPhone } = parsedData;

      setEditUserData({ userName, userEmail, userPhone });
      console.log(editUserData.userName)
    }
  }, [])


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

    if (passwordRegex.test(state.userNewPassword)) {
      dispatcher({ type: "USERNEWPASSWORDERROR", payload: false });
    } else {
      dispatcher({ type: "USERNEWPASSWORDERROR", payload: true });
    }
    if (state.userNewPassword === editUserData.userName) {

    }
  }



  const handleCancelButton = () => {
    dispatcher({ type: 'ISEDITFORM', payload: false })
  }

  return (
    <div className="h-fit w-4/5 border bg-green-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50  px-7 py-8">
      <header className="bg-slate-200/70 rounded-md">
        <ul className="flex justify-between px-10 py-7 text-2xl">
          <li>Welcome, <span className="text-blue-800 text-3xl">{userName}</span></li>
          <li className="bg-red-500 cursor-pointer rounded-lg px-2 py-1 text-white" onClick={logoutHandel}>Logout</li>
        </ul>
      </header>
      <main className="bg-slate-500/70 rounded-md h-fit mt-2">
        {state.isEditForm ?
          (<form
            autoComplete="off"
            onSubmit={editFormHandle}
            className={`flex flex-col pt-3 `}
          >
            <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
              <FiUser className="absolute" />
              <input
                type="text"
                className="w-80 relative bg-transparent pl-9 pr-10 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
                placeholder="Enter your name"
                value={state.userName ? state.userName : editUserData.userName}
                onChange={userNameHandler}
              />
              <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.usernameError ? 'username at least 5 character' : ''}</p>
            </div>
            <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
              <FiMail className="absolute" />
              <input
                type="text"
                className="w-80 relative bg-transparent pl-9 pr-4 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
                placeholder="Enter your email"
                value={state.userEmail ? state.userEmail : editUserData.userEmail}
                onChange={userEmailHandler}
              />
              <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.userEmailError ? 'enter valid email' : ''}</p>
            </div>
            <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
              <FiPhoneCall className="absolute" />
              <input
                type="text"
                className="w-80 relative bg-transparent pl-9 pr-4 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
                placeholder="Enter your phone"
                value={state.userPhone ? state.userPhone : editUserData.userPhone}
                onChange={userPhoneHandler}
              />
              <p className="absolute text-sm pl-20 mt-12 text-red-500">{state.userPhoneError ? 'enter valid phone number' : ''}</p>

            </div>
            <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
              <FiLock className="absolute" />
              <input
                type='text'
                className="w-80 relative bg-transparent pl-9 pr-4 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
                placeholder="Enter current password"
                value={state.userPassword}
                onChange={userPasswordHandler}
              />
              <p className="absolute text-sm mt-20 text-red-500">{state.userPasswordError ? 'At least one (lower & upper letter, digits, and specified special characters) minimum length of 8' : ''}</p>


            </div>
            <div className="mx-auto text-2xl flex items-center py-4 text-slate-200">
              <FiLock className="absolute" />
              <input
                type='text'
                className="w-80 relative bg-transparent pl-9 pr-4 focus:outline-none border-b-2 border-gray-200 placeholder-gray-200"
                placeholder="Enter new password"
                value={state.userNewPassword}
                onChange={userNewPasswordHandler}
              />
              <p className="absolute text-sm mt-20 text-red-500">{state.userNewPasswordError ? 'At least one (lower & upper letter, digits, and specified special characters) minimum length of 8' : ''}</p>


            </div>
            <div className="pt-5 flex mx-auto space-x-3">
              <input type="submit" value={`${state.isLoading ? 'Updating ...' : 'Update'}`} className='cursor-pointer bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 mx-auto text-2xl flex items-center py-2 my-3  text-slate-200  w-40 justify-center rounded-full  overflow-hidden `} disabled={!isFormValid()} onClick={handleSignupButton' />
              <button className="cursor-pointer bg-blue-700  mx-auto text-2xl flex items-center px-1 py-2 my-3  text-slate-200  w-40 justify-center rounded-full space-x-3 overflow-hidden" onClick={handleCancelButton}>Cancel</button>
            </div>
          </form>) :
          (<div className="py-12 px-10 grid grid-cols-2">
            <ul className="flex flex-col">
              <li className="py-3 text-xl font-bold"><span>Name</span> : <span className="font-normal text-2xl">{userName}</span></li>
              <li className="py-3 text-xl font-bold"><span>Email</span> : <span className="font-normal text-2xl">{userEmail}</span></li>
              <li className="py-3 text-xl font-bold"><span>Phone No</span> : <span className="font-normal text-2xl">{userPhone}</span></li>
            </ul>
            <div className="flex flex-col w-36 mx-auto">
              <button className="my-5 px-4 py-2 rounded-md bg-blue-700 text-white" onClick={editProfileHandel}>Edit Profile</button>
              <button className="my-5 px-4 py-2 rounded-md bg-red-700 text-white" onClick={logoutHandel}>Delete Profile</button>
            </div>
          </div>)}
      </main>
    </div>
  );
}
