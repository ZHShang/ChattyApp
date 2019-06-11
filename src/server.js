// server.js
const uuid = require('uuid/v1')
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let counter = 0;
let colors = [
  "black",
  "green",
  "red",
  "blue",
  "yellow"
]

let currentColor = colors[0];


wss.broadcast = function broadcast(data){
  wss.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN){
        client.send(data);
      }
    });
}

const increaseUsers = () => {
  counter++;
  let userCount = {
    type: "userCount",
    data: counter
  }
  wss.broadcast(JSON.stringify(userCount));
}

const decreaseUsers = () => {
  counter--;
  let userCount = {
    type: "userCount",
    data: counter
  }
  wss.broadcast(JSON.stringify(userCount));
}

wss.on('connection', (ws) => {

  console.log('Client connected');
  increaseUsers();


  ws.on('message', (message) => {

    console.log("received data: " + message);
    const json = JSON.parse(message);
    const dataToSend = {...json}
    if(json.type === "postMessage"){
      dataToSend.type = "incomingMessage";
      dataToSend.id = uuid();
    } else if (json.type === "postNotification"){
      dataToSend.type = "incomingNotification";
      dataToSend.id = uuid();
    } else if (json.type === "colorChange"){
      dataToSend.type = "incomingNotification"
      dataToSend.id = uuid();
    }
    const msgToSend = JSON.stringify(dataToSend);
    console.log("heyo: ", msgToSend);

    wss.broadcast(msgToSend);

  });




  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    console.log('Client disconnected');
    decreaseUsers();
})
});