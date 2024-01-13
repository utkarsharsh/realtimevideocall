import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import { Navigate, useNavigate } from 'react-router-dom';
import './roomentry.css'
import a from '../../assets/70-d_1600x1200.png'
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
    <div className='container'>
      <div className="bubulles">
        <span></span>
      </div>
      <div className="login">
      <img src='https://images.pexels.com/photos/3204950/pexels-photo-3204950.jpeg' />
        <div className="loginleft"> 
        <img src={a} alt="" style={{display:"block"}} />
        
        </div>
        <div className="loginright">
        
          <div className="logoname">
           <h1> Utkarsh</h1>
          </div>
          <div className="welcome">
            <h2>Welcome to videoapp</h2>
          </div>
    <div className="input">
  <fieldset>
    <legend>Name</legend>
    <input value={"ioo"} type="email" id='email' placeholder='Name' name='email' onChange={(e)=>{setemail(e.target.value)}}>
   
   </input>
  </fieldset>
   
  
<fieldset>
  <legend>RoomID</legend>
  <input value={90} type="number" id='room' name='room' placeholder='Room' onChange={(e)=>{setroom(e.target.value)}}></input>
</fieldset>
  
   
    
  
   <div className="generateroom">
    <p>Generate roomId</p>
   </div>
  
   <button  onClick={handleclick} >Let's Go </button>

   </div>
   
   <div className="or">
    <p>------- or --------</p>
   </div>
   <div className="google">
    <p> 📙 Read doucumentation </p>
   </div>
   <div className="github">
    <p>Know more ?</p>
    <a href='#'> Github</a>
   </div>
   </div>
   </div>
   </div> 
  </>
  )
}

export default Roomentry