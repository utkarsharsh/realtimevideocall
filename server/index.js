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



});

httpServer.listen(3000);