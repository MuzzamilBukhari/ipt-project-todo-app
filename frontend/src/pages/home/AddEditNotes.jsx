import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md'

export default function AddEditNotes({ setOpenAddEditModal, notes , setNotes , type}) {

    const [tags, setTags] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [error , setError] = useState("")
    
    
const closeModalHandler  = ()=>{
    setOpenAddEditModal({
          isShown: false,
          type: "add",
          data: null
        })
}

const addNote = async()=>{};
const editNote = async()=>{};



const handleAddNotes = ()=>{
    if(!title){
        setError("Please enter the title!!")
        return  
    }

    if(!content){
        setError("Please enter the content!!")
        return 
    }

    setError("");

    if(type === "add"){
        AddNotes();
        return
    }

    if(type === "edit"){
        EditNotes();
    }



    // Add logic to save the note here
}


    return (


        <div>
            <div className='flex  flex-col gap-2 '>

               <div className='flex items center w-full justify-between cursor-pointer text-sm'>
                <label htmlFor="" className='text-xs text-slate-400 '>TITLE:</label>
                <MdClose className='cursor-pointer text-[20px] text-slate-400 hover:text-black' 
                onClick={closeModalHandler} />
                </div>
                <input
                    type="text"
                    className='text-2xl text-slate-950 outline-none '
                    placeholder='Go to give tutions from 6pm'
                    value={title}
                    onChange={(e)=>(setTitle(e.target.value))}
                />
            </div>

            <div className='flex  flex-col gap-2 mt-3'>

                <label htmlFor="" className='text-xs text-slate-400 '>CONTENT:</label>
                <textarea  type= "text" 
                
                 className='text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded '
                 placeholder='Content...'
                 rows={8}
                 value={content}
                 onChange={(e)=>(setContent(e.target.value))}
                 ></textarea>
                
            </div>

            <div className='mt-3'>
                <label htmlFor="" className='text-xs text-slate-400'>Tags:</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
           {error && <p className='text-red-500 text-sm mt-1.5 '>{error}</p>}

            <button className='bg-blue-600 font-medium mt-3.5 p-3  w-full text-sm border  text-white  rounded  hover:bg-blue-700 transition-all duration-300 cursor-pointer '
            onClick={handleAddNotes}
            > Add</button>

        </div>




    )
}
