import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {


  socket = new WebSocket("ws://localhost:3001", "protocolOne");


  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  componentDidMount() {

    this.socket.onopen = e => {
      console.log("connection made");
    }

    this.socket.onmessage = ev => {
          console.log("Received:", ev.data);
          console.log(JSON.parse(ev.data));
        }
    console.log("componentDidMount <App />");


    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 7, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
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
          oldState.currentUser = {name: evt.target.value}
          this.setState({currentUser: oldState.currentUser});
          return;
        }
      }
      if(evt.target.className ==="chatbar-message"){
        const nMessage = {
          id: Math.floor((Math.random() * 100) +1),
          type: "incomingMessage",
          username: this.state.currentUser.name,
          content: evt.target.value
        }
        this.socket.send(JSON.stringify(nMessage));


        const messages = this.state.messages.concat(nMessage);
        this.setState({messages: messages});
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
