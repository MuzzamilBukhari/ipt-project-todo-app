import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link } from "react-router-dom";
import PasswordInput from '../../components/NavBar/input/PasswordInput';

export default function Login() {
  return (
    // <div>This is login component!!</div>
    <>
      <NavBar />
      <div className='flex items-center justify-center mt-28 '>

        <div className='w-96  rounded bg-white px-7 py-10 drop-shadow'>
          <form  onSubmit={()=>{}}>
          <h4 className='text-2xl mb-7'>Login</h4>

          {/* email here */}
          <input type="text" placeholder='Enter your Email!' className='w-full text-sm bg-transparent border-[1.5px] border-slate-200 px-5 py-3 rounded mb-4 outline-none'/>
           

           <PasswordInput/>


          <button type="submit" className='w-full text-sm border bg-blue-600 text-white p-2 rounded hover:bg-white hover:text-blue-600 hover:border-slate-200 transition-all duration-300 cursor-pointer '>Login</button>

          
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
