import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Messages({ message, activeMember }) {

function displayMessage (message){
  const {member,text} = message;

  if (!member) {
    console.error("Invalid message object:", message);
    return null;
  }

  const messageFromMe = member.id === activeMember.id;
  const className = messageFromMe 
    ? "Messages-message activeMember"
    : "Messages-message";

    return (
      <li className={className} key={uuidv4()}>
      <div className='Message-content'>
        <div className='username'>
          {member.username}:
        </div>
          <div className='text'>
            {text}
          </div>
          
        </div>
        </li>
    )
}
console.log("Messages:", message);
console.log("Active Member:", activeMember);

  return (
    <div className='Message-list'>
      {message && message.map((message) => displayMessage(message)
      )}
    </div>
  );
}

export default Messages;

