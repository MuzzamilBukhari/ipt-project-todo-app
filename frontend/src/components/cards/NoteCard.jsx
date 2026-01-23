import React from 'react'
import {MdOutlinePushPin , MdCreate , MdDelete} from "react-icons/md"

export default function NoteCard({title , date , content , tags, isPinned , onEdit , onDelete  , onPinNote}) {
  return (
    <div className='border border-slate-200 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out drop-shadow cursor-pointer'>
        <div className='flex items-center justify-between '>
            <div>
                <h6 className='font-medium text-sm'>{title}</h6>
                <span className='text-sm text-slate-500'>{date}</span>
            </div>
            <MdOutlinePushPin className={`text-xl text-slate-400 cursor-pointer hover:text-blue-600  ${isPinned? 'text-blue-600' : 'text-slate-300'}`}  onClick={onPinNote}/>

        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

        <div className='flex items-center justify-between mt-2 '>
          <div className='text-xs text-slate-500'>{tags}</div>

          <div className="flex items-center gap-2 ">

            <MdCreate className='icon-btn text-slate-400 hover:text-green-600'
            onClick={onEdit} />
            <MdDelete className='icon-btn text-slate-400 hover:text-red-500'
            onClick={onDelete}
            />
          </div>

        </div>
    </div>
  )
}
