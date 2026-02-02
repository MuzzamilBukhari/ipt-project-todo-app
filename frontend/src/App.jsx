// import Home from './pages/home/home'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from './pages/signUP/signUP';

import Start from './pages/start/start';
import Home from "./pages/home/Home";
import { useState } from "react";
import Login from "./pages/login/Login";


function App() {
 
  const [showToastMsg, setShowToastMsg] = useState({
      isShown: false,
      msg: "",
      type: "add"
    });
  
    const closeToastHandler = () => {
      setShowToastMsg({
        isShown: false,
        msg: "",
        type: "add"
      })
    }
  
    const showToastMsgHandler = (message, type) => {
  
      setShowToastMsg({
        isShown: true,
        msg: message,
        type: type
   
      })
  
  
    }
    console.log(closeToastHandler)


  return (

    
  <Router>

    <Routes>
     <Route path="/" element={<Start/>} />
     <Route path='/dashboard' element={<Home showToastMsgHandler={showToastMsgHandler} showToastMsg={showToastMsg} CloseToastHandler={closeToastHandler}/>} />
     <Route path='/signUp' element={<SignUP showToastMsgHandler={showToastMsgHandler}/>} />
     <Route path='/login' element={<Login showToastMsgHandler={showToastMsgHandler}/>} />
    </Routes>
    
  </Router>
       
   )
}

export default App
