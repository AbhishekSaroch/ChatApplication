import React, { useContext } from "react";
import  { useMemo } from "react";

import { io } from "socket.io-client";
const SocketContext = React.createContext(null);

export const useSocket = () => {
  const socket=useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("https://backend-4p03.onrender.com/"), []);

  return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
