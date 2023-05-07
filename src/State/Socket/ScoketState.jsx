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
    availableConnection,
    callingRef,
    setStream,
    peerInstance,
    redirect,
    stream,
    setCallAlert,
    me,
    peerId,
    conn,
  } = useContext(UseContext);
  useEffect(() => {
    socket.current = SocketIoClient(process.env.REACT_APP_SOCKET_SERVER_LINK, {
      transports: ["websocket"],
    });

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

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const closeHandler = () => {
      console.log("closing from another side");
      availableConnection.current.close();
      availableConnection.current = null;
      redirect("/");
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      setStream(null);
    };
    if (availableConnection.current !== null) {
      availableConnection.current.on("close", closeHandler);
      availableConnection.current.on("data", (data) => {});
    }
    return () => {
      if (availableConnection.current !== null) {
        availableConnection.current.off("close", closeHandler);
      }
    };
  }, [availableConnection.current]);

  useEffect(() => {
    if (peerInstance.current !== null) {
      const handler = (call) => {
        console.log("you have call");
        redirect("/chat");
        callingRef.current = call;
        setCallAlert(true);
      };

      peerInstance.current.on("call", handler);
      peerInstance.current.on("connection", (connection) => {
        console.log("you have connection");
        connection.send();
        connection["caller"] = connection.peer;
        availableConnection.current = connection;
        connection.send("connection establish");
      });

      return () => {
        peerInstance.current.off("call", handler);
      };
    }
  }, [peerInstance.current]);

  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};
export default SocketState;
