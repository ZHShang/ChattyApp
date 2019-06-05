import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {




  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");


    this.socket.onopen = e => {
      console.log("connection made");
    }

    this.socket.onmessage = ev => {
      console.log("Received:", ev.data);
      const msgToShow = JSON.parse(ev.data);
      switch(msgToShow.type){
        case "incomingMessage":
          this.setState((prevState) => {
            prevState.messages.push(msgToShow);
            this.setState({messages: prevState.messages});
          });
          break;
        case "incomingNotification":
          const message ={
            user: "doNotUse",
            content: msgToShow.content,
            id: msgToShow.id
          }
          this.setState((prevState) => {
            prevState.messages.push(message);
            this.setState({messages: prevState.messages});
          });
          break;
        default:
          throw new Error("Unknown message type: " + msgToShow.type);
    }

    }

    console.log("componentDidMount <App />");

  }

  handleNewMessage = evt => {
    if(evt.keyCode === 13){
      if(evt.target.className === "chatbar-username"){
        if(evt.target.value.length === 0){
          let oldState = this.state;
          oldState.currentUser = {name: "Anonymous"}
          this.setState({currentUser: oldState.currentUser});
        } else {
          let oldState = this.state;
          const newMsg = {
            type: "postNotification",
            content: oldState.currentUser.name + " has changed their name to " + evt.target.value
          }
          oldState.currentUser = {name: evt.target.value}
          this.socket.send(JSON.stringify(newMsg));
          this.setState({currentUser: oldState.currentUser});
          return;
        }
      }
      if(evt.target.className ==="chatbar-message"){
        const nMessage = {
          type: "postMessage",
          username: this.state.currentUser.name,
          content: evt.target.value
        }
        this.socket.send(JSON.stringify(nMessage));
        evt.target.value = "";
    }}


  }

  render(){
    return (
      <div>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} />
      </div>
    );
  }
}
export default App;
