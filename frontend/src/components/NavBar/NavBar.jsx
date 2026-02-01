import React, { useEffect, useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';



export default function NavBar({ userInfo , searchHandler} ) {

   console.log(searchHandler)
    const [query, setQuery] = useState("")

    
    useEffect(() => {
     
        const delayDebounceFn = setTimeout(() => {
            
            searchHandler(query);
        }, 300); 

        
        return () => clearTimeout(delayDebounceFn);
    }, [query]);
    

    const onClearSearch = ()=>{
        setQuery("");
       
        
    }

    const navigate = useNavigate();

    const onLogOut = ()=>{
        localStorage.clear();
        navigate("/login")



    }

    const onChange = (e)=>{
        setQuery(e.target.value);
        
    }
    
    return (
        
        <>
        <div className="bg-white flex items-center justify-between px-[36px] py-[6px] gap-2 drop-shadow  sticky top-0  ">
            <h1 className='text-[27px] font-bold  text-blue-600 py-2'>
                  Notes! 
            </h1>

            {userInfo &&
            <SearchBar value={query}
             onChange={onChange}
             onClearSearch={onClearSearch}
             />}

             {userInfo &&
            <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>
            }
        
        </div>
       

        </>
    )
}
