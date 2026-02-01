import React, { use, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/cards/NoteCard'

import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'

import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../utils/contants'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import EmptyCard from '../../components/Empty Card/EmptyCard'


export default function Home({ showToastMsgHandler, showToastMsg, CloseToastHandler }) {

  console.log(CloseToastHandler)

  const [notes, setNotes] = useState([])
  const [userInfo, setUserInfo] = useState("");

  const [openAddEditModal, setOpenAddEditModal] = useState({

    isShown: false,
    type: "add",
    data: null

  });

 


  const navigate = useNavigate();


  //getting user info!
  const getUserInfo = async () => {
    try {
      console.log("Nabeeeel from home")
      const response = await fetch(`${API_BASE_URL}get-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        setUserInfo(data.user);
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.error("Error fetching user info:", error);
      localStorage.clear();
      navigate("/login");
    }

  }


  //gettting notes api call
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}get-all-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();

      if (response.ok && !data.error) {
        setNotes(data.notes);

      } else {
        console.error("Error fetching notes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  }



  // deleting notes api call
  const deleteNoteHandler = async (noteId) => {
    try {
      const response = await fetch(`${API_BASE_URL}delete-note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        showToastMsgHandler("Note deleted successfully!", "delete");
        getAllNotes();
      } else {
        console.error("Error deleting note:", data.message);
      }
    } catch (error) {
      console.error("An unexpected server error , plz Try again later!", error);
    }

  }


    const editHandler = (note) => {
      setOpenAddEditModal({
        isShown: true,
        type: "edit",
        data: note
      })

    };



    useEffect(() => {

      getUserInfo();
      getAllNotes();

    }, []);


    return (
      // <div >THis is home component!! </div>
      <>
        <NavBar userInfo={userInfo} />

        {notes.length>0 ? (
        <div className='container mx-auto px-14 py-8 '>

          <div className='grid grid-cols-3 gap-4'>


            
             {notes.map((note, index) => (
              <NoteCard key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => editHandler(note)}
                onDelete={() => deleteNoteHandler(note._id)}
                onPinNote={() => { }}
              />
            ))
          

        }
          


          </div>

        </div>
        ) : (<EmptyCard setOpenAddEditModal={setOpenAddEditModal}/>) }


        <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 absolute right-10 bottom-10 hover:bg-blue-700  drop-shadow cursor-pointer transition-all ease-in-out duration-300 '
          onClick={() => {
            setOpenAddEditModal({
              isShown: true,
              type: "add",
              data: null
            })
          }}>


          <MdAdd className='text-[30px] text-white ' />

        </button>

        <Modal

          isOpen={openAddEditModal.isShown}
          onRequestClose={() => { }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          }}

          contentLabel=""
          className="w-[40%] max-h-[90%] bg-white rounded mx-auto mt-15 p-5 overflow-auto "
        >

          <AddEditNotes noteData={openAddEditModal.data}
            setOpenAddEditModal={setOpenAddEditModal}
            notes={notes} setNotes={setNotes}
            type={openAddEditModal.type}
            getAllNotes={getAllNotes}
            showToastMsgHandler={showToastMsgHandler} />

        </Modal>

        <ToastMessage

          isShown={showToastMsg.isShown}
          message={showToastMsg.msg}
          type={showToastMsg.type}
          onClose={CloseToastHandler}
        />


      </>

    )
  }


