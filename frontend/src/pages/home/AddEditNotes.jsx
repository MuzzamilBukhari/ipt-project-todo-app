import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md'
import { API_BASE_URL } from '../../utils/contants'


export default function AddEditNotes({ noteData, setOpenAddEditModal, notes, setNotes, type, getAllNotes, showToastMsgHandler })  {

    const [tags, setTags] = useState(noteData ? noteData.tags : [])
    const [content, setContent] = useState(noteData ? noteData.content : "")
    const [title, setTitle] = useState(noteData ? noteData.title : "")
    const [error, setError] = useState("")


    const closeModalHandler = () => {
        setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null
        })
    }

    const addNote = async () => {

        try {

            const response = await fetch(`${API_BASE_URL}add-note`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    tags

                })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok && !data.error) {
                showToastMsgHandler("Note added successfully!", "add");
                getAllNotes();
                closeModalHandler();
            } else {
                setError(data.message || "Failed to add note. Please try again.");
            }

        } catch (error) {
            setError("Internal server error while adding notes. Try again later.");

        }

    };


    const editNote = async () => {
        try {

            const response = await fetch(`${API_BASE_URL}edit-note/${noteData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    tags

                })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok && !data.error) {
                showToastMsgHandler("Note updated successfully!", "edit");
                getAllNotes();
                closeModalHandler();
            } else {
                setError(data.message || "Failed to edit note. Please try again.");
            }

        } catch (error) {
            setError("Internal server error while editing notes. Try again later.");
        }

    };



    const handleAddEditNotes = () => {
        if (!title) {
            setError("Please enter the title!!")
            return
        }

        if (!content) {
            setError("Please enter the content!!")
            return
        }

        setError("");

        if (type === "add") {
            addNote();
            return
        }

        if (type === "edit") {
            editNote();
        }

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
                    onChange={(e) => (setTitle(e.target.value))}
                />
            </div>

            <div className='flex  flex-col gap-2 mt-3'>

                <label htmlFor="" className='text-xs text-slate-400 '>CONTENT:</label>
                <textarea type="text"

                    className='text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded '
                    placeholder='Content...'
                    rows={8}
                    value={content}
                    onChange={(e) => (setContent(e.target.value))}
                ></textarea>

            </div>

            <div className='mt-3'>
                <label htmlFor="" className='text-xs text-slate-400'>Tags:</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {error && <p className='text-red-500 text-sm mt-1.5 '>{error}</p>}

            <button className='bg-blue-600 font-medium mt-3.5 p-3  w-full text-sm border  text-white  rounded  hover:bg-blue-700 transition-all duration-300 cursor-pointer '
                onClick={handleAddEditNotes}
            >{type === "add" ? "Add" : "Update Note"} </button>

        </div>




    )
}
