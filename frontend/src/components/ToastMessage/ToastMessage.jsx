import React, { useEffect } from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
export default function ToastMessage({ isShown, message, type, onClose }) {

    console.log(onClose)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         onClose()
            
    //     }, 3000)
    
    //   return () => {
    //     clearInterval(timer)
        
    //   }
    // }, [onClose])

    useEffect(() => {
    // Sirf tab timer lagao jab toast dikh raha ho
    if (isShown) {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer); // Correct cleanup
        };
    }
}, [isShown]); // Ab ye sirf tab chalega jab isShown true/false hoga
    


    return (

        <div className={`fixed top-16 sm:top-20 right-3 sm:right-7 transition-all duration-300 z-50 ${isShown ? 'opacity-100 ' : 'opacity-0'
            } `} >
                
            <div className={`min-w-52 max-w-xs sm:max-w-sm bg-white border border-slate-200 shadow-2xl rounded-md after:w-1 after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} mb-4 after:absolute after:top-0 after:left-0 after:rounded-l-lg relative`}>

                <div className='flex items-center gap-2 sm:gap-3 py-2 px-3 sm:px-4'>

                    <div className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 ${type === "delete" ? "bg-red-100" : "bg-green-100"}`}>
                        
                        {type === 'delete' ? <MdDeleteOutline className="text-red-500 text-lg sm:text-xl" /> :
                            <LuCheck
                                className="text-lg sm:text-xl text-green-500"
                            />}

                    </div>
                    <p className='text-xs sm:text-sm text-slate-800 wrap-break-word'>{message}</p>
                </div>
            </div>
        </div >

    )
}
