
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router";


let user;
let roomID;

const Lobby = () => {
  const socket=useSocket();
  
  
  const navigate=useNavigate();
  
  const senduser = () => {
    user = document.getElementById("inputbtn").value;
    document.getElementById("inputbtn").value = "";
    roomID=document.getElementById("roombtn").value;
    document.getElementById("roombtn").value="";
  };

  const [name, setname] = useState("");
  const [room, setroom] = useState("");

  console.log(name,room)
  

  // socket.on("connect", () => {
  //   // alert("connected")
  //  console.log("Socket ID Is",socket.id)
  // });


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    socket.emit("room:join",{name,room})
  }, [name,room,socket]);
  
  const handlejoinroom=useCallback((data)=>{
   const {name,room}=data;
   navigate(`/room/${room}`)

  },[navigate])

 useEffect(()=>{
    socket.on("room:join",handlejoinroom);
    return()=>{
      socket.off("room:join",handlejoinroom);
    }
 },[socket,handlejoinroom])

  return (
    <div className="bg-gradient-to-b from-purple-500 to-pink-500 min-h-screen flex justify-center items-center">
      <form
        className="bg-white w-96 p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Enter Your Name
          </label>
          <input
            type="text"
            id="inputbtn"
            className="w-full py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-purple-400"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="block text-gray-700 text-sm font-bold mb-2">
            Enter The Room
          </label>
          <input
            type="number"
            id="roombtn"
            className="w-full py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-purple-400"
            value={room}
            onChange={(e) => setroom(e.target.value)}
            placeholder="Room Number"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-green-400"
            type="submit"
            onClick={senduser}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export { user,roomID };

export default Lobby;
