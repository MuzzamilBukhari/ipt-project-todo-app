import React from 'react'
import NoteTaking from '../../assets/notesPic.png'
export default function EmptyCard({setOpenAddEditModal}) {
    return (
        <>
            <div className='container mx-auto px-4 sm:px-6 md:px-14 py-6 sm:py-8 flex justify-center'>
                <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%]'>
                    <div className='flex flex-col items-center justify-center font-bold text-lg sm:text-xl md:text-2xl text-blue-700 gap-6 sm:gap-8 md:gap-10 mt-4 sm:mt-7'>

                        <img src={NoteTaking} alt="Note Taking" className="w-48 h-48 sm:w-60 sm:h-60 md:w-70 md:h-70 object-contain bg-white" />

                       

                        <button onClick={() => {
                            setOpenAddEditModal({
                                isShown: true,
                                type: "add",
                                data: null
                            })
                        }} className='px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center rounded-xl sm:rounded-2xl cursor-pointer bg-blue-200 border hover:bg-blue-300 transition-all'>
                            Create your First Note!
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
