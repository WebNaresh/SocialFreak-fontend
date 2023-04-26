import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./Component/Chat/Chat";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Test from "./utils/Test";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/profile" element={<Test />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/map" element={<Test />} />
      </Routes>
    </>
  );
};
export default App;
