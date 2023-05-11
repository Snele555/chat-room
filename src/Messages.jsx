import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Messages({ messages }) {
  const [stateMessages, setStateMessages] = useState([]);

  useEffect(() => {
    setStateMessages(messages);
  }, [messages]);

  return (
    <div className='Message-list'>
      {stateMessages.map((message) => (
        <div key={uuidv4()} style={{ color: message.color }}>
          <strong>{message.user}: </strong>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;

