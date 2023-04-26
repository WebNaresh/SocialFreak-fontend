import React from "react";
import { useContext } from "react";
import TestContext from "./TestContext";
import UseContext from "../UseState/UseContext";
export const TestState = (props) => {
  const { setAppAlert, setAppLoading } = useContext(UseContext);

  const handleAlert = (alert, type, msg) => {
    setAppAlert({
      alert: alert || false,
      type: type || "success",
      msg: msg || "this is test message",
    });
  };
  const handleLoader = (load, color, time) => {
    setAppLoading({
      load: load || true,
      color: color || "#fff",
    });
    setTimeout(
      () => {
        setAppLoading({
          load: false,
        });
      },
      time ? time : 2000
    );
  };

  return (
    <TestContext.Provider value={{ handleAlert, handleLoader }}>
      {props.children}
    </TestContext.Provider>
  );
};
export default TestState;
