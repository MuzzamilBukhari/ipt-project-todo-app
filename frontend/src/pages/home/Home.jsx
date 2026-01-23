import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import NoteCard from '../../components/cards/NoteCard'

import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'

import Modal from 'react-modal'

export default function Home() {

  const [notes , setNotes] = useState([])


  const [openAddEditModal, setOpenAddEditModal] = useState({

    isShown: false,
    type: "add",
    data: null

  });



  return (
    // <div >THis is home component!! </div>
    <>
      <NavBar />
      <div className='container mx-auto px-14 py-8 '>

        <div className='grid grid-cols-3 gap-4'>


          <NoteCard title="meeting on 7th April"
            date="11th Dec 2026"
            content="hell bro this is content of the notes rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
            tags="#meeting #office"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

          <NoteCard title="meeting on 7th April"
            date="11th Dec 2026"
            content="hell bro this is content of the notes rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
            tags="#meeting #office"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

          <NoteCard title="meeting on 7th April"
            date="11th Dec 2026"
            content="hell bro this is content of the notes rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
            tags="#meeting #office"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

          <NoteCard title="meeting on 7th April"
            date="11th Dec 2026"
            content="hell bro this is content of the notes rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
            tags="#meeting #office"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

          <NoteCard title="meeting on 7th April"
            date="11th Dec 2026"
            content="hell bro this is content of the notes rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrtttttttttttttttttttttttttttttt"
            tags="#meeting #office"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />

        </div>



      </div>

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

        <AddEditNotes  setOpenAddEditModal={setOpenAddEditModal} notes={notes} setNotes={setNotes} type={openAddEditModal.type} />

      </Modal>


    </>

  )
}
