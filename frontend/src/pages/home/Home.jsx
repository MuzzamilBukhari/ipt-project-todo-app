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
import { IoMdClose } from 'react-icons/io'


export default function Home({ showToastMsgHandler, showToastMsg, CloseToastHandler }) {


  const [notes, setNotes] = useState([])
  const [userInfo, setUserInfo] = useState("");

  const [openAddEditModal, setOpenAddEditModal] = useState({

    isShown: false,
    type: "add",
    data: null

  });

  const [viewNote, setViewNote] = useState({ isShown: false, data: null });


  const handleViewNote = (note) => {
    setViewNote({ isShown: true, data: note });
  };

  const navigate = useNavigate();

   const formatDate = (dateString) => {
    const date = new Date(dateString); // DB ki string ko date banaany k lyr

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // searching notes api call!

  const searchHandler = async (query) => {


    if (!query || query.trim() === "") {
      return getAllNotes(); // Agar search khali hai toh saare notes wapas le aao
    }

    try {

      const response = await fetch(`${API_BASE_URL}search-notes?search=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,

        }
      });
      const data = await response.json();
      console.log(data)
      if (response.ok && !data.error) {
        setNotes(data.notes);
      } else {
        console.error("Error searching notes:", data.message);
      }
    }
    catch (error) {
      console.error("Internal Server Error vro!", error);
    }

  }


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

  //pinning notes api call
  const isPinnedHandler = async (noteId, pinStatus) => {

    try {
      const response = await fetch(`${API_BASE_URL}update-pin-status/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          isPinned: pinStatus
        })
      });
      const data = await response.json();
      if (response.ok && !data.error) {
        showToastMsgHandler(`Note ${pinStatus ? "pinned" : "unpinned"} successfully!`, "add");
        getAllNotes();
      } else {
        console.error("Error pinning/unpinning note:", data.message);
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

    // searchHandler("");
    getUserInfo();
    getAllNotes();

  }, []);


  return (
    // <div >THis is home component!! </div>
    <>
      <NavBar userInfo={userInfo} searchHandler={searchHandler} />

      {notes.length > 0 ? (
        <div className='container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-6 md:py-8'>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>



            {notes.map((note, index) => (
              <NoteCard key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => editHandler(note)}
                onDelete={() => deleteNoteHandler(note._id)}
                onPinNote={() => { isPinnedHandler(note._id, !note.isPinned) }}
                onViewNotes={() => handleViewNote(note)}
                formatDate={formatDate}
              />
            ))


            }



          </div>

        </div>
      ) : (<EmptyCard setOpenAddEditModal={setOpenAddEditModal} />)}


      <button className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-blue-600 fixed right-3 sm:right-4 bottom-3 sm:bottom-4 hover:bg-blue-700 drop-shadow cursor-pointer transition-all ease-in-out duration-300 z-40'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null
          })
        }}>


        <MdAdd className='text-[28px] sm:text-[30px] text-white ' />

      </button>


      {/* for adding and editing notes */}
      <Modal

        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}

        contentLabel=""
        className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-h-[90%] bg-white rounded mx-auto mt-10 sm:mt-15 p-4 sm:p-5 overflow-auto "
      >

        <AddEditNotes noteData={openAddEditModal.data}
          setOpenAddEditModal={setOpenAddEditModal}
          notes={notes} setNotes={setNotes}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
          showToastMsgHandler={showToastMsgHandler} />

      </Modal>


      {/* for viewing note details */}
      <Modal
        isOpen={viewNote.isShown}
        onRequestClose={() => setViewNote({ isShown: false, data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)", // Background andhera karne ke liye
          },
        }}
        className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] max-h-[90%] bg-white rounded mx-auto mt-10 sm:mt-15 p-6 sm:p-8 md:p-10 overflow-auto relative"
      >
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-red-500"
          onClick={() => setViewNote({ isShown: false, data: null })}
        >
          <IoMdClose className="text-xl sm:text-2xl hover:text-black" />
        </button>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{viewNote.data?.title}</h2>
          <span className="text-xs text-slate-500">
            {viewNote.data?.createdAt ? formatDate(viewNote.data.createdAt) : ""}
          </span>

          <p className="text-slate-600 text-sm leading-relaxed mt-4 whitespace-pre-wrap">
            {viewNote.data?.content}
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {viewNote.data?.tags.map((tag, index) => (
              <span key={index} className="text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
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


