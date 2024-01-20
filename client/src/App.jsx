import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Roomentry from './components/roomentry/Roomentry'
import { io } from "socket.io-client";
import Videoenty from './components/videoentry/Videoenty'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);
  const [email,setemail]=useState(null);

  const socket = io("https://backendforvideoapp.onrender.com",{
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "yyyyyy"
    }});
  useEffect(
    ()=>{
      socket.on("connection", () => {
        console.log(socket.id);
        
      });
      

    },[]
  )

  

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Roomentry socket={socket} email={email} setemail={setemail}/>} />
  <Route path='video' element={<Videoenty socket={socket}   email={email} setemail={setemail}/>} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
