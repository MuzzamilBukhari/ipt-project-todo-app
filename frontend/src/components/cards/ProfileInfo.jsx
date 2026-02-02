import React from 'react'
import getUserInitials from '../../utils/userInitials';

export default function ProfileInfo({ onLogOut, userInfo }) {
  console.log(userInfo)


  // const logoutHandler = (e)=>{
  //       e.preventDefault();
  // }

  return (
    // <div>ProfileInfo</div>
    <>
    
      <div className='flex items-center gap-2 sm:gap-3'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm sm:text-base'>{getUserInitials(userInfo?.username)}</div>
        <div>
          <p className='text-xs sm:text-sm font-medium '>{userInfo?.username}</p>
          <button onClick={onLogOut} className='text-xs sm:text-sm text-blue-600 underline cursor-pointer '>Logout!</button>
        </div>

      </div>

    </>
  )
}
