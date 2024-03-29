import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { user, roomID } from "./Lobby";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { Link } from "react-router-dom";
import Message from "../Messages/Message";
import {BsFillSkipBackwardCircleFill} from "react-icons/bs"
import "../Messages/Message.css"
const Room = () => {
  const socket = useSocket();

  const id = socket.id;
  console.log("ID IS", id);
  const [messages, setmessages] = useState([]);
  console.log("Messages Are", messages);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("sendingmessage", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket.emit("welcome", { user: "Admin", id })
    socket.on("welcometheuser", (data) => {
      setmessages([...messages, data]);
      console.log("welcome",data)
    });
    
  return()=>{
    socket.off();
  }
    
  }, []);
  
 

  useEffect(() => {
    socket.on("sendmessage", (data) => {
      console.log(data.message, "by", data.user, data.id);
      setmessages([...messages, data]);
    });

    return () => {
      socket.off("sendmessage");
    };
  }, [messages]);

  return (
    <div className="bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 w-screen h-screen flex justify-center items-center">
      <div className="bg-white h-4/5 w-11/12 p-4 rounded-lg shadow-lg">
        <div className="bg-purple-600 text-white p-4 rounded-t-lg flex  justify-between items-center">
          <h1 className="lg:text-2xl sm:xl">Welcome to the Chat</h1>
          <Link to={"/"}><button className="lg:text2xl sm:xl" ><BsFillSkipBackwardCircleFill className="text-xl" /></button></Link>
        </div>
        <ReactScrollToBottom className="h-4/6 overflow-y-auto p-4">
          {messages.map((item, index) => (
            <Message
              message={item.message}
              key={index}
              user={item.id !== id ? item.user : ""}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        .
        <div className="h-1/6 flex items-center">
          <input
            type="text"
            id="chatInput"
            className="w-4/5 py-2 px-4 rounded-l-lg bg-pink-100 focus:outline-none focus:ring focus:ring-purple-400 placeholder-pink-400"
            placeholder="Type your message..."
          />
          <button
            className="bg-purple-600 text-white w-1/5 py-2 rounded-r-2xl hover:bg-purple-700 hover:cursor-pointer focus:outline-none"
            onClick={send}
          >
            Send
          </button>
          
         
        </div>
        
      </div>
    </div>
  );
};

export default Room;
