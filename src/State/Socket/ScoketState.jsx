import React, { useEffect } from "react";
import { useContext } from "react";
import SocketContext from "./SocketContext";
import UseContext from "../UseState/UseContext";
import SocketIoClient from "socket.io-client";

export const SocketState = (props) => {
  const { socket, setPosts, utils, setUtils, setChats, userId } =
    useContext(UseContext);
  useEffect(() => {
    socket.current = SocketIoClient(
      "https://socialfreak-backend.onrender.com",
      {
        transports: ["websocket"],
      }
    );
    socket.current.on("take-posts", (commingPost) => {
      setPosts((array) => [...array, ...commingPost]);
    });
    socket.current.on("users", (map) => {
      var newMap = new Map(JSON.parse(map));
      setUtils((utils) => ({ ...utils, onlineUser: newMap }));
    });
    socket.current.on("get-msg", (data) => {
      if (userId.current === data.sender._id) {
        setChats((chat) => [...chat, data]);
      } else {
        setUtils((copy) => ({
          ...copy,
          messageNotification: utils.messageNotification + 1,
        }));
      }
    });
    //eslint-disable-next-line
  }, []);
  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};
export default SocketState;
