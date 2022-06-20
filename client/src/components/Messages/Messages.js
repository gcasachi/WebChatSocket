import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import "./Messages.css";

import Message from './Message/Message';

const Messages = ({messages, nome}) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} nome={nome}  /></div> )}
    </ScrollToBottom>
);

export default Messages;