import React, { useState, useEffect } from 'react';

function Messages({ messages }) {
  console.log(messages.messages);
  const [stateMessages, setStateMessages] = useState([]);

  useEffect(() => {
    setStateMessages(messages);
  }, [messages]);

  return (
    <div className='Message-list'>
      {stateMessages.map((message, id) => (
        <div key={id} style={{ color: message.color }}>
          <strong>{message.user}: </strong>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;

