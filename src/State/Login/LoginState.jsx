import axios from "axios";
import React, { useContext } from "react";
import TestContext from "../Test/TestContext";
import UseContext from "../UseState/UseContext";
import LoginContext from "./LoginContext";
import jwtDecode from "jwt-decode";
import Peer from "peerjs";

export const LoginState = (props) => {
  // Destructuring values from the UseContext and TestContext
  const {
    me,
    setMe,
    redirect,
    setOpen,
    open,
    formData,
    setFormData,
    data,
    posts,
    setPosts,
    utils,
    setUtils,
    allLink,
    socket,
    setChats,
    setCookie,
    availableConnection,
    userVideo,
    setCallAlert,
    callingRef,
    setStream,
    myVideo,
    peerState,
    setPeerState,
  } = useContext(UseContext);

  const { handleLoader } = useContext(TestContext);

  // Function to handle Facebook login
  const handleFaceBookLogin = (response) => {
    // Function to add days to a given date
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const data = {
      userName: response.name,
      profilePicture: response.picture.data.url,
      userEmail: response.email,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(process.env.REACT_APP_REGISTER_USER, data, config)
      .catch((errors) => {})
      .then((response) => {
        const expirationDate = addDays(new Date(), 30);
        setCookie("login", response.data.token, {
          expires: expirationDate,
        });
        setMeUniVersal(response);

        socket.current.emit("add-user", response.data.user._id);
        redirect("/");
      });
  };

  // Function to handle when Facebook component is clicked
  const handleFacebookComponentClicked = (response) => {
    // Add implementation here
  };

  // Function to handle Google login
  const handleGoogleLogin = (e) => {
    let response = jwtDecode(e.credential);
    const data = {
      userName: response.name,
      profilePicture: response.picture,
      userEmail: response.email,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(process.env.REACT_APP_REGISTER_USER, data, config)
      .catch((errors) => {})
      .then((response) => {
        setCookie("login", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
        });
        setMeUniVersal(response);

        redirect("/");
        socket.current.emit("add-user", response.data.user._id);
      });
  };

  // Function to handle failed Google login
  const handleGoogleLoginFail = (e) => {
    // Add implementation here
  };

  // Function to update data from the backend
  const updateDataFromBackend = () => {
    const data = {
      profileLink: formData.profileLink,
      backgroundLink: formData.backgroundLink,
      userName: formData.userName,
      hightlight: formData.array,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    handleLoader();

    axios
      .put(
        `${process.env.REACT_APP_UPDATE_PROFILE_CARD}${me._id}`,
        data,
        config
      )
      .catch((errors) => {})
      .then((response) => {
        setMeUniVersal(response);
        setFormData({
          ...formData,
          selectedProfilePic: null,
          selectedBackgroundPic: null,
        });
      });

    setOpen({
      ...open,
      profileCard: false,
    });
  };

  // Function to upload file to Cloudinary
  const uploadToCloudinary = async (file, string) => {
    handleLoader(true, "#fff", 4000);

    const formDataD = new FormData();
    formDataD.append("file", file);
    formDataD.append("upload_preset", "y7gvucmq");

    const response = axios.post(
      process.env.REACT_APP_UPDATE_CLUDINARY_LINK,
      formDataD
    );

    if (string === "profile") {
      handleLoader();
      setFormData({
        ...formData,
        profileLink: response.data.url,
        selectedProfilePic: null,
      });
    } else if (string === "background") {
      handleLoader();
      setFormData({
        ...formData,
        backgroundLink: response.data.url,
        selectedBackgroundPic: null,
      });
    }
  };

  // Function to update profile information to the backend
  const updateProfileInfoToBackend = (info) => {
    const config = { headers: { "Content-Type": "application/json" } };
    handleLoader();

    axios
      .put(
        `${process.env.REACT_APP_UPDATE_UPDATE_PROFILE_INFO_TO_BACKEND}${me._id}`,
        info,
        config
      )
      .then((response) => {
        setMeUniVersal(response);
      });

    setOpen({
      ...open,
      profileInfo: false,
    });
  };

  // Function to handle post creation
  const handlePost = (images) => {
    const data1 = {
      imagesArray: images,
      title: data.title,
      taggedPeople: data.taggedPeopleArray,
      hashTags: data.hashtagArray,
    };

    setOpen({
      ...open,
      createModal: false,
    });

    handleLoader(true, "#fff", 4000);
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`${process.env.REACT_APP_CREATE_POST}${me._id}`, data1, config)
      .catch((errors) => {})
      .then((response) => {
        setPosts([response.data.post, ...posts]);
        setMe((copy) => ({
          ...copy,
          post: [...copy.post, response.data.post],
        }));
        handleLoader();
      });
  };

  // Function to send a request to view a post
  const requestToView = async (id) => {
    const data = {
      postId: id,
    };
    const config = { headers: { "Content-Type": "application/json" } };

    await axios
      .post(`${process.env.REACT_APP_VIEW_POST}${me._id}`, data, config)
      .catch((errors) => {});
  };

  // Function to get posts
  function getPosts(firstTime) {
    if (firstTime === "firstTime") {
      axios
        .post(
          `${process.env.REACT_APP_GET_POST}${me._id}/?page=${utils.pageNumber}`
        )
        .then((res) => {
          setPosts([...posts, ...res.data.posts]);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_GET_POST}${me._id}/?page=${utils.pageNumber}`
        )
        .then((res) => {
          setPosts([...posts, ...res.data.posts]);
        });
    }

    setUtils((value) => ({ ...value, pageNumber: value.pageNumber + 1 }));
  }

  // Function to get friends
  const getFriends = () => {
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`${process.env.REACT_APP_GET_FREINDS}${me._id}`, config)
      .catch((errors) => {})
      .then((response) => {});
  };

  // Function to handle received chat messages
  const myFun = (data) => {
    if (utils.cuurentUserIdForMsg === data.sender._id) {
      setChats((chat) => [...chat, data]);
    } else {
      setUtils((copy) => ({
        ...copy,
        messageNotification: utils.messageNotification + 1,
      }));
    }
  };

  // Function to initiate a video call
  const callVideoCall = (id) => {
    redirect("/chat");

    const connection = peerState.connect(id);
    connection.send("data");
    connection["caller"] = me._id;
    availableConnection.current = connection;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        const call = peerState.call(id, stream);

        call.on("stream", (remoteStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = remoteStream;
          }
        });
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
  };

  // Function to accept a video call
  const acceptCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        callingRef.current.answer(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    callingRef.current.on("stream", function (remoteStream) {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
    });

    setCallAlert(false);
  };

  // Function to upload images and send them to the server
  const uploadImagesAndSendToServer = async (files) => {
    handleLoader();
    try {
      const uploadedImages = [];

      for (const file of files) {
        const uploadedImage = await uploadToCloudinary2(file);
        uploadedImages.push(uploadedImage);
      }

      await handlePost(uploadedImages);

      // Code to execute after uploading images and sending them to the server
    } catch (error) {
      // Handle any errors that occurred during the process
    }
  };

  // Function to upload file to Cloudinary
  async function uploadToCloudinary2(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "y7gvucmq");

    try {
      const response = await axios.post(
        process.env.REACT_APP_UPDATE_CLUDINARY_LINK,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      throw error;
    }
  }

  let setMeUniVersal = (response) => {
    setMe({
      ...me,
      backgroundPicture: response.data.user.backgroundPicture,
      birthDate: response.data.user.birthDate,
      collegeName: response.data.user.collegeName,
      descriptionHighLight: response.data.user.descriptionHighLight,
      followers: response.data.user.followers,
      following: response.data.user.following,
      hashTags: response.data.user.hashTags,
      hobby: response.data.user.hobby,
      memories: response.data.user.memories,
      post: response.data.user.post,
      profilePicture: response.data.user.profilePicture,
      relationShip: response.data.user.relationShip,
      taggedPeople: response.data.user.taggedPeople,
      userEmail: response.data.user.userEmail,
      userName: response.data.user.userName,
      _id: response.data.user._id,
      userSuggestion: response.data.user.userSuggestion,
    });
  };
  function findUniqueElements(array1, array2, property) {
    if (array1.length === 0) {
      return [];
    }
    const uniqueElements = [];

    // Iterate over elements in array1
    for (let i = 0; i < array1.length; i++) {
      const element = array1[i];

      // Check if element is not present in array2 based on the specified property
      if (!array2.some((item) => item[property] === element[property])) {
        uniqueElements.push(element);
      }
    }

    // Iterate over elements in array2
    for (let i = 0; i < array2.length; i++) {
      const element = array2[i];

      // Check if element is not present in array1 based on the specified property
      if (!array1.some((item) => item[property] === element[property])) {
        uniqueElements.push(element);
      }
    }

    return uniqueElements;
  }
  function getCommonObjectsByProperty(array1, array2, property) {
    var commonObjects = array1.filter(function (obj1) {
      return array2.some(function (obj2) {
        return obj1[property] === obj2[property];
      });
    });

    return commonObjects;
  }
  return (
    <LoginContext.Provider
      value={{
        handleFaceBookLogin,
        handleFacebookComponentClicked,
        handleGoogleLogin,
        handleGoogleLoginFail,
        updateDataFromBackend,
        uploadToCloudinary,
        updateProfileInfoToBackend,
        handlePost,
        requestToView,
        getPosts,
        getFriends,
        myFun,
        callVideoCall,
        acceptCall,
        uploadImagesAndSendToServer,
        setMeUniVersal,
        findUniqueElements,
        getCommonObjectsByProperty,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
