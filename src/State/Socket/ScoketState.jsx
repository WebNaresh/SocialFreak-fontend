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
    myVideo,
    userVideo,
    setMe,
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
    socket.current.on("request", (commingPost) => {
      let suggestedUser = me.userSuggestion.filter(
        (ele) => ele._id !== commingPost._id
      );
      setMe((Copy) => ({
        ...Copy,
        userSuggestion: suggestedUser,
        followers: [...me.followers, commingPost],
      }));
    });
    socket.current.on("followBack", (commingPost) => {
      me.following.push(commingPost);
      me.followers.push(commingPost);
      setMe((Copy) => ({
        ...Copy,
        userSuggestion: Copy.userSuggestion.filter(
          (ele) => ele._id !== commingPost._id
        ),
        following: me.following,
        followers: me.followers,
      }));
    });

    // socket connection

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (peerInstance.current?._id === null) {
      while (true) {
        const peer = new Peer(me._id);
        peerInstance.current = peer;
        if (peerInstance.current._id !== null) {
          break;
        }
      }
    }
    if (peerInstance.current?._disconnected === true || undefined) {
      peerInstance.current.reconnect();
    }
  }, [peerInstance.current]);

  useEffect(() => {
    const closeHandler = () => {
      availableConnection.current.close();
      availableConnection.current = null;
      redirect("/");
      setCallAlert(false);
      if (stream?.getTracks() !== undefined) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        myVideo.current.srcObject = null;
        userVideo.current.srcObject = null;
        // setStream(null);
      }
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
        redirect("/chat");
        callingRef.current = call;
        setCallAlert(true);
      };

      peerInstance.current.on("call", handler);
      peerInstance.current.on("disconnected", () => {});
      peerInstance.current.on("open", (id) => {});
      peerInstance.current.on("connection", (connection) => {
        connection.send();
        connection["caller"] = connection.peer;
        availableConnection.current = connection;
        connection.on("data", function (data) {});
      });

      return () => {
        peerInstance.current.off("call", handler);
      };
    }
  }, [peerInstance.current]);
  useEffect(() => {
    if (me?._id !== null && me?._id !== undefined) {
      const peer = new Peer(me._id);
      peerInstance.current = peer;
    }
  }, [me]);
  useEffect(() => {
    if (availableConnection.current?.caller !== undefined) {
    }
  }, [availableConnection.current]);

  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};
export default SocketState;

// let suggestedUser = me.userSuggestion.filter(
//   (ele) => ele._id !== commingPost._id
// );
// let newFollow = me.followers.push(commingPost);
// if (!me.followers.includes(commingPost)) {
//   setMe((Copy) => ({
//     ...Copy,
//     friends: [...Copy.friends, commingPost],
//     userSuggestion: Copy.userSuggestion.filter(
//       (ele) => ele._id !== commingPost._id
//     ),
//     following: Copy.following.filter(
//       (ele) => ele._id !== commingPost._id
//     ),
//     followers: [...Copy.friends, commingPost],
//   }));
// }
