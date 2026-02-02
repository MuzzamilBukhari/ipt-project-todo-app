import React, { useEffect, useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { FaBars, FaTimes } from 'react-icons/fa';



export default function NavBar({ userInfo , searchHandler} ) {

   console.log(searchHandler)
    const [query, setQuery] = useState("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    
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
        <div className="bg-white flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-9 py-3 sm:py-1.5 gap-2 drop-shadow sticky top-0 z-50">
            <h1 className='text-xl sm:text-2xl md:text-[27px] font-bold text-blue-600 py-2'>
                  Notes! 
            </h1>

            {/* Desktop Search Bar - Hidden on mobile */}
            {userInfo &&
            <div className="hidden md:flex flex-1 max-w-md mx-4">
                <SearchBar value={query}
                 onChange={onChange}
                 onClearSearch={onClearSearch}
                 />
            </div>}

            {/* Desktop Profile - Hidden on mobile */}
            {userInfo &&
            <div className="hidden md:block">
                <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>
            </div>
            }

            {/* Mobile Menu Button */}
            {userInfo && (
                <button 
                    className="md:hidden text-2xl text-blue-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            )}
        
        </div>

        {/* Mobile Menu Dropdown */}
        {userInfo && isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-slate-200 shadow-lg px-4 py-4 space-y-4">
                <SearchBar 
                    value={query}
                    onChange={onChange}
                    onClearSearch={onClearSearch}
                />
                <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>
            </div>
        )}
       

        </>
    )
}
