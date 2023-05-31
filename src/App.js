
import React, { useEffect, useState } from 'react';
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
  const [message, setMessages] = useState([])
  
  const [drone, setDrone] = useState();

  useEffect (() => {
  const drone = new window.Scaledrone('JV9uhFd3abtFz6J6', {data: user,});

  drone.on ("open", (error) => {
    if (error) {
      return console.error (error);
    }
    console.log ('Povezan na Sacledrone')
    user.id = drone.clientId;
    setUser(user);
  });

  const room = drone.subscribe("observable-MyApp");
  room.on ("message", (message)=>{
    setMessages ((prevState) => [...prevState, message]);
  });

  console.log ('usla u sobu');
  setDrone(drone);

}, [user]);


  function onMessageChange (event) {
    console.log("onMessageChange called:", event.target.value);
    setText(event.target.value);
    
  }

  function onMessageSave(event) {
    event.preventDefault()
    const newMessage = { user, text };
    console.log (newMessage);
    setMessages([...message,{...newMessage}]);

    if (drone) {
      drone.publish({
      room:"observable-MyApp",
      message: newMessage,
    });
    console.log('korisnik je rekao' + message)
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
      activeUser={user}
    />
    <Input
      message={text}
      onMessageChange={onMessageChange}
      onMessageSave={onMessageSave}
    />
  </main>
  
);
};

export default App;
