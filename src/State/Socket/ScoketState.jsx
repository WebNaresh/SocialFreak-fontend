import React, { useEffect } from "react";
import { useContext } from "react";
import SocketContext from "./SocketContext";
import UseContext from "../UseState/UseContext";
import SocketIoClient from "socket.io-client";
import Peer from "peerjs";

export const SocketState = (props) => {
  const {
    socket,
    setPosts,
    utils,
    setUtils,
    setChats,
    userId,
    chat,
    setPeerId,
    myVideo,
    userVideo,
    peerInstance,
    redirect,
    callInstance,
    setCallAlert,
    callAlert,
  } = useContext(UseContext);
  useEffect(() => {
    socket.current = SocketIoClient(process.env.REACT_APP_SOCKET_SERVER_LINK, {
      transports: ["websocket"],
    });
    const peer = new Peer();
    peerInstance.current = peer;

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
        if (
          chat.current[chat.current.length - 1].sender._id === data.sender._id
        ) {
          chat.current[chat.current.length - 1].message.push(data.message);
        } else {
          chat.current.push(data);
        }
      } else {
        setUtils((copy) => ({
          ...copy,
          messageNotification: utils.messageNotification + 1,
        }));
      }
    });

    // socket connection

    peerInstance.current.on("open", (id) => {
      setPeerId(id);
    });
    peerInstance.current.on("close", (id) => {
      console.log(id + "hello");
    });
    peerInstance.current.on("call", (call) => {
      callInstance.current = call;
      setCallAlert({ ...callAlert, alert: true });
      redirect("/chat");
    });
    //eslint-disable-next-line
  }, []);
  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};
export default SocketState;
