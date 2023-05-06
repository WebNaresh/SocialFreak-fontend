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
    userVideo,
    peerInstance,
    redirect,
    callInstance,
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

  // peerInstance.current.on("call", (call) => {
  //   callInstance.current = call;
  //   redirect("/chat");
  //   console.log(call);
  //   callInstance.current.on("close", () => {
  //     console.log("call disconnect");
  //   });
  //   callInstance.current.on("error", (err) => {
  //     console.log("call disconnect err" + err);
  //   });
  //   setCallAlert(true);
  // });
  // peerInstance.current.on("connection", (connection) => {
  //   conn.current = connection;
  //   console.log("conection establish");
  //   conn.on("close", () => {
  //     console.log("call close event");
  //   });
  // });
  useEffect(() => {
    const closeHandler = () => {
      console.log("connection is close");
      availableConnection.current.close();
      availableConnection.current = null;
      redirect("/");
    };
    if (availableConnection.current !== null) {
      console.log(availableConnection);

      availableConnection.current.on("close", closeHandler);
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
        console.log("you have vall");
        redirect("/chat");
        callingRef.current = call;
        setCallAlert(true);
      };

      peerInstance.current.on("call", handler);
      peerInstance.current.on("connection", (connection) => {
        console.log("you have connection");
        connection["caller"] = connection.peer;
        availableConnection.current = connection;
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
