import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import './videoentry.css'
import cross from './cross.png'
import menu from './menu.png'
const Videoenty = ({ socket,email,setemail }) => {
  const [callloader,setcallloader]=useState(false);
  const [stream, setstream] = useState();
  const [runanmation,setrunanimation]=useState(-1);
  const [reaction,setreaction]=useState(["😀","😛","🤢","😭","🤡","💖","👄"]);
  const [translate,settranslate]=useState(true);
  const [translate2,settranslate2]=useState(true);
console.log(email);
  const [reciver, setreciver] = useState(null);
  const [buttonforcall, setbuttonforcall] = useState(null);
  const [remotestream, setremotestream] = useState();
  const [callbtn,setcallbtn]=useState("block");
  const [s,sets]=useState("block");
const [chat,setchat]=useState([]);
const  [chatinput,setchatinput]=useState(null);
 let pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });
  useEffect(() => {
   
    peer.peer.addEventListener("track", (ev) => {
      const remote = ev.streams;
      console.log(remote);
       setremotestream(remote[0]);
      console.log("remotestream", remotestream);
    });
   
  }, [remotestream]);
   
 async  function handlenegosiation(){
  const offer= await peer.getOffer();
  console.log("user caller");
  socket.emit("nego:need",{to:reciver,offer});

  }
  useEffect(()=>{
    peer.peer.addEventListener("negotiationneeded",handlenegosiation);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handlenegosiation);
    };
  },[handlenegosiation])

  async function openmedia() {
  alert("Wait for call to accept ");
  setcallloader(true);
    let a = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log("usercalled");
  setcallbtn("none");
    setstream(a);
   sets("none");
    const offer = await peer.getOffer();
    
    socket.emit("usercallingto", { to: reciver, offer });
    
  }

  async function handleoffer({ from, offer }) {
   console.log("handleoffer");
    let b = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    
    setstream(b);
    setcallbtn("none");
    setreciver(from);
    // await pc.setRemoteDescription(offer);
    const ans = await peer.getAnswer(offer);
    
    socket.emit("answerofcall", { to: from, ans});
    
  }

  const sendStreams = async () => {
    sets("none");

    const tracks = await stream.getTracks();
    // console.log("arraaay",tracks/)
    for (const track of tracks) {
      peer.peer.addTrack(track,stream);
    }
  };

  async function handleaccepted({ from, ans }) {
     peer.setLocalDescription(ans);
     console.log("ans accepted or not")
       sendStreams();
  }
async function handlenegosiationtwo({from,offer}){
  console.log("what handlen2");
  const ans= await peer.getAnswer(offer);
  console.log("after offer handlen2");
  socket.emit("nego:last",{to:from,ans});

}
async function handlenegolast({from,ans}){
  console.log("problem is there");
  console.log(ans);
 await  peer.setLocalDescription(ans);
}


  useEffect(() => {
    socket.on("room:join", (data) => {
      console.log(data);
      setreciver(data);
    });
    // if(stream){
    console.log(stream, "use effect");
    socket.on("callutha", handleoffer);
    socket.on("accepted", handleaccepted);
    socket.on("nego:needed",handlenegosiationtwo);
    socket.on("nego:lasted",handlenegolast);
    return () => {
      socket.off("room:join", (data) => {
        console.log(data);
        setreciver(data);
      });
      socket.off("callutha", handleoffer);
      socket.off("accepted", handleaccepted);

      socket.off("nego:need",handlenegosiationtwo);
    socket.off("nego:last",handlenegolast);
      // }
    };
  }, [socket, stream ,remotestream]);
  function remotemessage({naam,data}) {
    let a={
      name:naam,
      message:data
    }
    console.log(a);
    setchat((pre)=>{return([...pre,a])});
  }
  function reactresponse({index}){
setrunanimation(index);
  }

useEffect(()=>{
  socket.on("messaging",remotemessage);
  socket.on("reactresponse",reactresponse);
  return()=>{
    socket.off("messaging",remotemessage);
    socket.off("reactresponse",reactresponse);
  }

},[socket]);
function localmessage(){
  console.log(email);
  socket.emit("message",{naam:email,data:chatinput});
  setchatinput("");
}

useEffect(()=>{
  let timer1 =setTimeout(()=>{
setrunanimation(-1);
},4000);
return(()=>{
  clearInterval(timer1);
})
},[runanmation]);
function handletrans(){
  settranslate(!translate);
  settranslate2(!translate2);
}


  return (
    <>
    <div className="mainbox">
<div className="mainboxin">
  { remotestream &&  <>{translate ? <img src={menu} alt="chat" className="nani" onClick={handletrans}/>:<img src={cross} className="nani" alt="removechat" onClick={handletrans}/> } </>}

  {!reciver &&  <div className="preanimation">
<div className="gif">
<img src="https://cdn.pixabay.com/animation/2023/06/17/12/36/12-36-04-680_512.gif"></img>
</div>
<h2 style={{color:"white"}}>Waiting to join someone</h2>
</div> }   
      <div className="button">
        {reciver && (
          <button className="call" style={{ width: 100, height: 100 ,display:callbtn,color:"white"} } onClick={openmedia}>
            {" "}
            Call
          </button>
        )}
        
       
        {stream && <button onClick={sendStreams} className="sendstream" style={{display:s}}> Accept Call</button>}
      </div>
{callloader && !remotestream && <>  <div className="callloader" >
<img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif?20140201131911" />

</div> </>}
      <div className={stream ? "stream":""}>
        {stream && (
          <div className="mystream" >
          <ReactPlayer
            url={stream}
            playing={true}
            muted
            width={100}
            height={100}
           
                     
          /></div>
        )}
      {remotestream && (
        <div className="remoteplayer">
        <ReactPlayer
          url={remotestream}
          playing={true}
          muted={false}
         width={"100%"}
         height={"100%"}
        />
        
        
        </div>


       
      )} 



       {
          remotestream && (<div className={translate2? "chatwraper":"chatwraper check" }> 
         <img src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="chating">
   {chat.map((e)=>{
  return(<><p className="chatingp">  {e.name}   {":)"} {"          "}   {e.message}</p></>)
   })}
            </div>
            <div className="sending">
            <input type="text" placeholder="Type your text" value={chatinput}onChange={(e)=>{
              
              setchatinput(e.target.value);
            }}></input>
            <button onClick={localmessage} >Send</button>
            </div>
          </div>
            ) 
        }
      <div className={remotestream ? "react":""}>
      {reaction.map((e,index)=>{
        return(
          <>
          <p key={index}  onClick={()=>{
            socket.emit("makereact",{index:index});
          }}><span className={runanmation==index ? "saktiman":""}>{e}</span></p>
          </>
        )
      })}
      </div>
      
      
      
      
      </div>
      </div>

      </div>
    </>
  );
};

export default Videoenty;
