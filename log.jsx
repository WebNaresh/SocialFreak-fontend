import * as React from "react";
import * as ReactDom from "react-dom";
import PeerJs from "peerjs";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";

let peer;
let connection;
const getUserMedia =
  navigator.getUserMedia ||
  navigator["webkitGetUserMedia"] ||
  navigator["mozGetUserMedia"];

const NameInput = () => {
  const history = useHistory();
  const [availablePeer, setAvailablePeer] = React.useState(peer);

  const submit = React.useCallback((ev) => {
    const input = ev.currentTarget.elements.namedItem("name");
    const user = input.value;
    ev.preventDefault();
    setAvailablePeer(new PeerJs(user));
  }, []);

  React.useEffect(() => {
    peer = availablePeer;

    if (availablePeer) {
      history.replace("/overview");
    }
  }, [availablePeer]);

  return (
    <form onSubmit={submit}>
      <label>Your name:</label>
      <input name="name" />
      <button>Save</button>
    </form>
  );
};

const Overview = () => {
  const history = useHistory();
  const [availablePeer] = React.useState(peer);
  const [availableConnection, setAvailableConnection] =
    React.useState(connection);

  const submit = React.useCallback(
    (ev) => {
      const input = ev.currentTarget.elements.namedItem("name");
      const otherUser = input.value;
      const connection = availablePeer.connect(otherUser);
      connection["caller"] = availablePeer.id;
      ev.preventDefault();
      setAvailableConnection(connection);
    },
    [availablePeer]
  );

  React.useEffect(() => {
    connection = availableConnection;

    if (!availablePeer) {
      history.replace("/");
    } else if (availableConnection) {
      history.replace("/call");
    } else {
      const handler = (connection) => {
        connection["caller"] = connection.peer;
        setAvailableConnection(connection);
      };
      peer.on("connection", handler);
      return () => peer.off("connection", handler);
    }
  }, [availablePeer, availableConnection]);

  return (
    <div>
      <h1>Hi, {availablePeer?.id}</h1>
      <form onSubmit={submit}>
        <label>Name to call:</label>
        <input name="name" />
        <button>Call</button>
      </form>
    </div>
  );
};

function showVideo(stream, video, muted) {
  video.srcObject = stream;
  video.volume = muted ? 0 : 1;
  video.onloadedmetadata = () => video.play();
}

function showStream(call, otherVideo) {
  const handler = (remoteStream) => {
    showVideo(remoteStream, otherVideo, false);
  };
  call.on("stream", handler);

  return () => call.off("stream", handler);
}

const Call = () => {
  const history = useHistory();
  const otherVideo = React.useRef();
  const selfVideo = React.useRef();
  const [messages, setMessages] = React.useState([]);
  const [availablePeer] = React.useState(peer);
  const [availableConnection, setAvailableConnection] =
    React.useState(connection);

  const appendMessage = React.useCallback(
    (message, self) =>
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now(),
          message,
          self,
          time: new Date().toLocaleTimeString(),
          user: self ? availablePeer.id : availableConnection.peer,
        },
      ]),
    []
  );

  React.useEffect(() => {
    if (availableConnection && availablePeer) {
      let dispose = () => {};
      const handler = (call) => {
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            showVideo(stream, selfVideo.current, true);
            call.answer(stream);
          },
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );

        dispose = showStream(call, otherVideo.current);
      };

      if (availableConnection["caller"] === availablePeer.id) {
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            showVideo(stream, selfVideo.current, true);
            dispose = showStream(
              availablePeer.call(availableConnection.peer, stream),
              otherVideo.current
            );
          },
          (error) => {
            console.log("Failed to get local stream", error);
          }
        );
      } else {
        availablePeer.on("call", handler);
      }

      return () => {
        availablePeer.off("call", handler);
        dispose();
      };
    }
  }, [availableConnection, availablePeer]);

  React.useEffect(() => {
    connection = availableConnection;

    if (!availableConnection) {
      history.replace("/overview");
    } else {
      const dataHandler = (message) => {
        appendMessage(message, false);
      };
      const closeHandler = () => {
        setAvailableConnection(undefined);
      };
      availableConnection.on("data", dataHandler);
      availableConnection.on("close", closeHandler);
      return () => {
        availableConnection.off("data", dataHandler);
        availableConnection.off("close", closeHandler);
      };
    }
  }, [availableConnection]);

  const submit = React.useCallback(
    (ev) => {
      const input = ev.currentTarget.elements.namedItem("message");
      const message = input.value;
      ev.preventDefault();
      availableConnection.send(message);
      appendMessage(message, true);
      input.value = "";
    },
    [availableConnection]
  );

  const disconnect = React.useCallback(() => {
    availableConnection.close();
    setAvailableConnection(undefined);
  }, [availableConnection]);

  return (
    <div>
      <h1>
        {availablePeer?.id} ⬄ {availableConnection?.peer}{" "}
        <button onClick={disconnect}>Hang up</button>
      </h1>
      <video ref={otherVideo} width={500} height={500} />
      <video ref={selfVideo} width={200} height={200} />
      <div>
        {messages.map((msg) => (
          <p key={msg.id} style={{ color: msg.self ? "#999" : "#222" }}>
            <b>{msg.user}</b> ({msg.time}): {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={submit}>
        <input name="message" />
        <button>Send</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={NameInput} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/call" component={Call} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
