import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Messages({ message, activeMember }) {

function displayMessage (message){
  const {member,data} = message;

  if (!member || !member.id) {
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
        <div className='Username'style={{color: member.clientData.color}}>
          {member.clientData.username}
        </div>
          <div className='text'>
            {data}
          </div>
          
        </div>
        </li>
    )
}
//console.log("Messages:", message);
//console.log("Active Member:", activeMember);

  return (
    <div>
      <ul className='Message-list'>
        {message.map((message) => displayMessage(message)
      )}
      </ul>
      
    </div>
  );
}

export default Messages;

