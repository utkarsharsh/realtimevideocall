import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'



const Videoenty = ({socket}) => {
const [stream,setstream]=useState(null);
const [reciver,setreciver]=useState(null);
const [buttonforcall,setbuttonforcall]=useState(null);
let pc= new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });
 async function openmedia(){
    let a=  await navigator.mediaDevices.getUserMedia( { audio: true, video: true }); 
    console.log(a);
    setstream(a);
    const offer = await this.peer.createOffer();
    await pc.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit("usercallingto", {to:reciver,offer});
}
useEffect(()=>{
    socket.on("room:join",(data)=>{
    console.log(data);
    setreciver(data);
    });
    socket.on("callutha",({from,offer})=>{
        console.log(offer);
    })
    return()=>{
      socket.off("room:join",(data)=>{
        console.log(data);
        setreciver(data);
       });
    }  },[socket]);





  return (<>
     <div className="button">
      {reciver &&  <button style={{width:100,height:100}} onClick={openmedia}> Call</button>}  
     </div>
    <div>
    {stream && <  ReactPlayer
    url={stream}
    playing={true}
    muted
    width={1000}
    height={1000}
    />} </div> 
    {/* <div>
<video src={stream} muted width={100} height={100}></video>
    </div> */}
    </>
  )
}

export default Videoenty