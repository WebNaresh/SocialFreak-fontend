import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./Component/Chat/Chat";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Test from "./utils/Test";
import VIdeoChat from "./Component/VIdeo/VIdeoChat";
import { Call, NameInput, Overview } from "./utils/test/test1";
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
        <Route exact path="/messages" element={<Chat />} />
        {/* <Route exact path="/" element={<NameInput />} />
        <Route exact path="/overview" element={<Overview />} />
        <Route exact path="/call" element={<Call />} /> */}
      </Routes>
    </>
  );
};
export default App;
