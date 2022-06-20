import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = (props) => {
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //const ENDPOINT = "localhost:5000";
  const ENDPOINT = "https://react-chat-aplication-backend.herokuapp.com/";
  const location = useLocation(); //Pega o url

  useEffect(() => {
    const { nome, sala } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setNome(nome);
    setSala(sala);

    socket.emit("join", { nome, sala }, () => {}); //Defini o evento que será mandado entre o servidor e o cliente
    return () => {
      //Para quando sair da sala
      socket.emit("disconnect"); // Irá chamar o socket de mesmo nome no server
      socket.off(); //Desligarta a conexão deste socket
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]); //Adiciona as mensagens no array
    });

    socket.on("usuarioSala", ({ users }) => {
      setUsers(users);
    });

  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar sala={sala} />
        <Messages messages={messages} nome={nome} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
