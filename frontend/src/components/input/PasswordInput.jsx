import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

export default function PasswordInput({ value, onChange, placeholder }) {

    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center bg-transparent border-[1.5px] border-slate-200 px-5 rounded mb-3 '>
            <input placeholder='Enter Password'
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}

                className='w-full text-sm bg-transparent py-3  rounded outline-none'

            />

  {/* toggling of eye icon  */}
            {isShowPassword ? <FaRegEye

              size={20}
              className="text-blue-600 cursor-pointer shrink-0"
              onClick={toggleShowPassword}
              /> : 
              <FaRegEyeSlash
              size={20}
              className="text-blue-600 cursor-pointer shrink-0"
              onClick={toggleShowPassword}
              />
              
            }


        </div>
    )
}
