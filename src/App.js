
import React, { useState } from 'react';
import Input from './Input';
import Messages from './Messages';
import "./App.css"
import Scaledrone from 'scaledrone-react-native';

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
  const [user, setUser] = useState(randomName());
  const [color, setColor] = useState(randomColor());
  const [messages, setMessages] = useState([
    {uuidv4: 1, text: "Pozdrav", user: "Marko Markić", color: "blue"}
  ])
  




  function onMessageChange (event) {
    console.log("onMessageChange called:", event.target.value);
    setText(event.target.value);
    
  }

  function onMessageSave(event) {
    event.preventDefault()
    const newMessage = { user, color, text };
    console.log (newMessage);
    setMessages([...messages,{id: Date.now(),...newMessage}]);
 
    setUser(randomName());
    setColor(randomColor());
    setText('');
  }
  const drone = new Scaledrone('JV9uhFd3abtFz6J6', {data: {name: user, color}});

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }


    drone.publish({
      room: 'MyApp',
      message: {message: 'Hello world!', score: 42}
    });
  });
  
  const room = drone.subscribe('MyApp');
  room.on('open', error => {
    if (error) {
      console.error(error);
    } else {
      console.log('Connected to room');
    }
  });
  room.on('data', (data,member) => {
    if(member && member.clientData){  setMessages(messages => [...messages, {id: Date.now(), }])
    messages.push ({member, text:data})
  }
  

  });
  
  drone.on('error', error => console.error(error));

  return (
    <main className='App'>
    <h1>Chat room </h1>
    <Messages messages={messages} />
    <Input
      message={text}
      onMessageChange={onMessageChange}
      onMessageSave={onMessageSave}
    />
  </main>
  
);
}

export default App;
