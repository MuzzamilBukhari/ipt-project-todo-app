import Home from './pages/home/home'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUP from './pages/signUP/signUP';
import Login from './pages/login/login';


function App() {

  return (

  <Router>

    <Routes>
     <Route path='/dashboard' element={<Home/>} />
     <Route path='/signUp' element={<SignUP/>} />
     <Route path='/login' element={<Login/>} />
    </Routes>
    
  </Router>
       
   
   


  )
}

export default App
