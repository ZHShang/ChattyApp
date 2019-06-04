import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const sample = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
  {
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
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


  render(){
    return (
      <MessageList messages={this.state.messages} />
    );
  }
}
export default App;
