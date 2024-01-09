import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
const Videoenty = ({ socket }) => {
  const [stream, setstream] = useState();

  const [reciver, setreciver] = useState(null);
  const [buttonforcall, setbuttonforcall] = useState(null);
  const [remotestream, setremotestream] = useState();

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
  
    let a = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log("usercalled");

    setstream(a);
   
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

    setreciver(from);
    // await pc.setRemoteDescription(offer);
    const ans = await peer.getAnswer(offer);
    
    socket.emit("answerofcall", { to: from, ans});
    
  }

  const sendStreams = async () => {
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

  return (
    <>
      <div className="button">
        {reciver && (
          <button style={{ width: 100, height: 100 }} onClick={openmedia}>
            {" "}
            Call
          </button>
        )}
        {stream && <button onClick={sendStreams}>Send Stream</button>}
      </div>
      <div>
        {stream && (
          <ReactPlayer
            url={stream}
            playing={true}
            muted
            width={1000}
            height={1000}
          />
        )}{" "}
      </div>
      <button>ppppp</button>
      {/* <div>
<video src={stream} muted width={100} height={100}></video>
    </div> */}
      {remotestream && (
        <ReactPlayer
          url={remotestream}
          playing={true}
          muted
          width={1000}
          height={1000}
        />
      )}
    </>
  );
};

export default Videoenty;
