
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
  const [user, setUser] = useState({
    username: randomName(),
    color: randomColor(),
  })
  const [messages, setMessages] = useState([])
  




  function onMessageChange (event) {
    console.log("onMessageChange called:", event.target.value);
    setText(event.target.value);
    
  }

  function onMessageSave(event) {
    event.preventDefault()
    const newMessage = { user, text };
    console.log (newMessage);
    setMessages([...messages,{...newMessage}]);
    //setUser(randomName());
    //setColor(randomColor());
    setText('');
  }

  return (
    <main className='App'>
    <h1>Chat room </h1>
    <Messages 
      messages={messages} 
      activeUser={user}
    />
    <Input
      message={text}
      onMessageChange={onMessageChange}
      onMessageSave={onMessageSave}
    />
  </main>
  
);
}

export default App;
