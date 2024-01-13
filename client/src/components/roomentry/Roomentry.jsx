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
    const [tran,settran]=useState(null);
    let ar=[2,4,5,2,7,11,10,12,4,8,6,4,9,12,13,12,11,13,6,0,1,2,2,4,5];
   const [arr,setarr]=useState([2,4,5,12,7,6,13,12,11,13,7,3,14,5,4,7,12,5,0,3,6,0,1,21,2,4,5,2,4,5,2,7,1,13,12,11,13,6,0,1,2,2,4,5,6,0,1,2,2,4,5]);
useEffect(()=>{

},[arr]);
  return (
    <>
    <div className='container'>
      <div className="bubulles">
       {arr.map((e,index)=>{
      return(  <span style={{animation:"backgroundani 8s linear infinite",
    animationDelay:e+"s"}} key={index} className={tran==index ? "tran":""} onClick={()=>{
     settran(index);
     console.log("click");
    }}> </span>)
       })} 
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