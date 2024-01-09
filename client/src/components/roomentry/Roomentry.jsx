import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import { Navigate, useNavigate } from 'react-router-dom';


const Roomentry = ({socket}) => {
    const [email,setemail]=useState(null);
    const [room,setroom]=useState(null);
    const navigate=useNavigate();
    function handleclick(){
        socket.emit("chat",{email,room});
       navigate("/video");

    }
   

  return (
    <>
    <label htmlFor="email">email</label>
   <input value={"ioo"} type="email" id='email' name='email' onChange={(e)=>{setemail(e.target.value)}}>
   
   </input>
   <label htmlFor="room">room</label>
   <input value={90} type="number" id='room' name='room' onChange={(e)=>{setroom(e.target.value)}}>
    
   </input>
   <input type="button" onClick={handleclick}>
   </input>
  </>
  )
}

export default Roomentry