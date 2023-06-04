
import React, { useEffect, useState } from 'react';
import Input from './Input';
import Messages from './Messages';
import "./App.css"
import { v4 as uuidv4 } from 'uuid';

function randomName() {
  const nicknames = [
    "Baja", "Buba", "Keka", "Dado", "Snele", "Šumi", "Lola"
  ];
  const birthnames = [
    "Gobanić", "Plesačica", "Pevaljka", "Druker", "Misica", "Miško", "Kralj"
  ];
  const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
  const birthname = birthnames[Math.floor(Math.random() * birthnames.length)];
  return nickname + " " + birthname;

}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


function App() {
  const [text, setText] = useState('');
  const [message, setMessages] = useState([]);

  const [member, setMembers] = useState({
    username: randomName(),
    color: randomColor(),
    id: uuidv4(),
  })
 
  
  const [drone, setDrone] = useState();



  useEffect (() => {
  const drone = new window.Scaledrone('JV9uhFd3abtFz6J6', {data: member,});

  drone.on ("open", (error) => {
    if (error) {
      return console.error (error);
    }
    console.log ('Povezan na Sacledrone');
    member.id = drone.clientId;
    setMembers(member);
  });

  const room = drone.subscribe("observable-MyApp");
  room.on ("message", (message)=>{
    setMessages ((prevState) => [...prevState, message]);
  });

  console.log ('usla u sobu');
  setDrone(drone);

}, [member]);


  function onMessageChange (event) {
    console.log("onMessageChange called:", event.target.value);
    setText(event.target.value);
    
  }
  

  function onMessageSave(event) {
    event.preventDefault()
    const newMessage = { data: text, id: uuidv4(),};
    //setMessages((prevMessages)=> [...prevMessages,newMessage]);

   if (drone) {
     drone.publish({
    room:"observable-MyApp",
     message: newMessage.data,
  });
    console.log("korisnik je rekao: " + newMessage.data)
    //setUser(randomName());
    //setColor(randomColor());
    setText('');

  }
}

  return (
    <main className='App'>
    <h1>Chat room </h1>
    <Messages 
      message={message} 
      activeMember={member}
    />
    <Input
      text={text}
      onMessageChange={onMessageChange}
      onMessageSave={onMessageSave}
    />
  </main>
  
);
};

export default App;
