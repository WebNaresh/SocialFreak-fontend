import React from "react";
import { Routes, Route } from "react-router-dom";
// import Chat from "./Component/Chat/Chat";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Test from "./utils/Test";
import VIdeoChat from "./Component/VIdeo/VIdeoChat";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<VIdeoChat />} />
        <Route exact path="/profile" element={<Test />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/map" element={<Test />} />
        <Route exact path="/videoChat" element={<VIdeoChat />} />
      </Routes>
    </>
  );
};
export default App;
