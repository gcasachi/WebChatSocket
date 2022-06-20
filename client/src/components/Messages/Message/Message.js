import React from "react";

import "./Message.css";

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, nome }) => {
  let isSentByCurrentUser = false;

  const trimNome = nome.trim().toLowerCase();

  if (user === trimNome) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimNome}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText">{user}</p>
    </div>
  );
};

export default Message;
