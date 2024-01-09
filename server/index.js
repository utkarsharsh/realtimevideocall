import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors:true,
});
let socketmap=new Map();
let mapsocket=new Map();
io.on("connection", (socket) => {
 console.log(socket.id);
 socket.on("chat",({email,room})=>{
    console.log(email,room,socket.id);
    io.to(room).emit("room:join",socket.id);
    socket.join(room);
  
 });
socket.on("usercallingto",({to,offer})=>{
  io.to(to).emit("callutha",{from:socket.id,offer});
})
socket.on("answerofcall",({to,ans})=>{
  console.log("answer",ans);
  io.to(to).emit("accepted",{from :socket.id,ans});
  
})
socket.on("nego:need",({to,offer})=>{
  io.to(to).emit("nego:needed",{from :socket.id,offer});
})
socket.on("nego:last",({to,ans})=>{
  io.to(to).emit("nego:lasted",{from :socket.id,ans});
});
});
httpServer.listen(3000);