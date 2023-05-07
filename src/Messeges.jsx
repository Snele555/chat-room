import React, { useState, useEffect } from 'react';

function Messages({ messages }) {
  const [stateMessages, setStateMessages] = useState([]);

  useEffect(() => {
    setStateMessages(messages);
  }, [messages]);

  return (
    <div>
      {stateMessages.map((message, index) => (
        <div key={index} style={{ color: message.color }}>
          <strong>{message.user}: </strong>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;

