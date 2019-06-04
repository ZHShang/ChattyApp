import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const sample = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
  {
    id: 0,
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    id: 1,
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    id: 2,
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    id: 3,
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    id: 4,
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    id: 5,
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
    id: 6,
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
  },
]
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: sample.messages,
      currentUser: sample.currentUser
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 7, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
