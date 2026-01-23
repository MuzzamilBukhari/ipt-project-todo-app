import React, { use, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from "react-router-dom";

import emailValidation from '../../utils/emailRegex';
import PasswordInput from '../../components/input/PasswordInput';

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const loginHandler = async (e) => {

    e.preventDefault()
    console.log("hello this is login prevent default behavior!!");

    if (!emailValidation(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!password) {
      setError("Please enter the password!");
      return;
    }

    setError("")

    //login api call!
  }





  return (
    // <div>This is login component!!</div>


    <>
      <NavBar />
      <div className='flex items-center justify-center mt-22 '>

        <div className='w-96  rounded bg-white px-7 py-10 drop-shadow'>
          <form onSubmit={loginHandler}>
            <h4 className='text-2xl mb-7'>Login</h4>

            {/* email here */}
            <input type="text" placeholder='Enter your Email!' className='w-full text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none'

              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />


            <PasswordInput value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            {/* validation para ! */}
            {error && <p className='text-red-500 text-[13px] pb-1 ml-[8px]'> {error}</p>}

            <button type="submit" className='w-full text-sm border bg-blue-600 text-white p-2 rounded  hover:bg-blue-700 transition-all duration-300 cursor-pointer '
              onClick={loginHandler}
            >Login</button>


            <p className='text-sm text-center mt-4 whitespace-pre-wrap'> Not registered yet?{"      "}
              <Link to="/signup" className="font-medium text-primary underline  text-blue-600 my-1 ">
                Create an Account!
              </Link>


            </p>

          </form>


        </div>
      </div>
    </>
  )

  
}
