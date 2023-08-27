const express = require("express");

const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const io = new Server(process.env.port ||8000, {
  cors: true,
});
const app = express();
app.use(bodyParser.json());

const users = [{}];

io.on("connect", (socket) => {
  console.log("Socket is ->", socket.id);
  //     socket.on("joined",({user,roomID})=>{
  //         console.log("socket id is",socket.id)
  //         users[socket.id,roomID]=user;
  //         console.log("user joined",user)
  //         socket.broadcast.emit("userjoined",{user:"Admin",message:`${users[socket.id]} has joined`})
  //    })
  socket.on("room:join", (data) => {
    const { name, room } = data;
    console.log("name", name, room);
    users[socket.id] = name;
    socket.join(room)
    io.to(socket.id).emit("room:join", data);
  });
  socket.on("welcome",(data)=>{
    const {user,id}=data;
   socket.emit("welcometheuser",{user:"Admin",message:`Welcome to Chat ${users[id]}`})
  
  })

  socket.on("sendingmessage",(data)=>{
    const {message,id}=data;
    io.emit("sendmessage",{user:users[id],message,id})
  })

  

 
});

