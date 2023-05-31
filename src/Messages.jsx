import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Messages({ message, activeUser }) {

function displayMessage (message){
  const {user,text} = message;
  const messageFromActiveUser = user.id === activeUser.id;
  const className = messageFromActiveUser 
    ? "Messages-message activeUser"
    : "Messages-message";

    return (
      <li className={className} key={uuidv4()}>
      <div className='Message-content'>
        <div className='username'>
          {user.username}:
        </div>
          <div className='text'>
            {text}
          </div>
          
        </div>
        </li>
    )
}

  return (
    <div className='Message-list'>
      {message && message.map((message) => displayMessage(message)
      )}
    </div>
  );
}

export default Messages;

