import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';



export default function NavBar() {

    const [query, setQuery] = useState("")

    const handleSearch = ()=>{

    }

    const onClearSearch = ()=>{
        setQuery("")
    }

    const navigate = useNavigate();

    const onLogOut = ()=>{

        navigate("/login")



    }
    return (
        
        <>
        <div className="bg-white flex items-center justify-between px-[36px] py-[6px] gap-2 drop-shadow  sticky top-0  ">
            <h1 className='text-[27px] font-bold  text-blue-600 py-2'>
                  Notes! 
            </h1>
            <SearchBar value={query}
             onChange={(e)=>{setQuery(e.target.value)}}
             handleSearch={handleSearch}
             onClearSearch={onClearSearch}
             />
            <ProfileInfo onLogOut={onLogOut}/>
        
        </div>
       

        </>
    )
}
