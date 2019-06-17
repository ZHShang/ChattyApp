import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob", color: "black"},
      colors: [
          "black",
          "green",
          "red",
          "blue",
          "yellow"
      ],
      messages: [],
      userCount: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");

    this.socket.onopen = e => {
      console.log("connection made");
      console.log("colors" + this.state.colors);
    }

    this.socket.onmessage = ev => {
      console.log("Received:", ev.data);
      const msgToShow = JSON.parse(ev.data);
      console.log("JSON: ", msgToShow);
      switch(msgToShow.type){
        case "incomingMessage":
          this.setState((prevState) => {
            prevState.messages.push(msgToShow);
            //prevState.currentUser = {name: msgToShow.user, color: msgToShow.newColor}
            this.setState({messages: prevState.messages});
          });
          break;
        case "incomingNotification":
          const message ={
            user: msgToShow.user,
            newColor: msgToShow.newColor,
            content: msgToShow.content,
            id: msgToShow.id
          }
          this.setState((prevState) => {
            //const keepSameColor = prevState.currentUser.color
            prevState.currentUser = {name: message.user, color: message.newColor}
            prevState.messages.push(message);
            this.setState({currentUser: prevState.currentUser, messages: prevState.messages});
          });
          console.log("CHANGED: ", this.state);
          break;
        case "userCount":
          this.setState((prevState) => {
            prevState.userCount = msgToShow.data;
            this.setState({userCount: prevState.userCount});
          })
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

          // let oldState = this.state;
          // oldState.currentUser = {name: "Anonymous"}
          // this.setState({currentUser: oldState.currentUser});

        } else {

          let oldState = this.state;
          const newMsg = {
            type: "postNotification",
            content: oldState.currentUser.name + " has changed their name to " + evt.target.value,
            user: evt.target.value,
            newColor: this.state.currentUser.color
          }
          this.socket.send(JSON.stringify(newMsg));
          oldState.currentUser = {name: evt.target.value, color: this.state.currentUser.color}
          this.setState({currentUser:oldState.currentUser })
          return;

        }

      } else if(evt.target.className ==="chatbar-message"){

        const nMessage = {
          type: "postMessage",
          username: this.state.currentUser.name,
          content: evt.target.value,
          color: this.state.currentUser.color
        }

        this.socket.send(JSON.stringify(nMessage));
        console.log("hihiihih: ", nMessage);
        evt.target.value = "";

      }}


  }


  render(){
    return (
      <div>
      <nav className="navbar" >
      <a href="/" className="navbar-brand">Chatty</a><div className="counter">{this.state.userCount} Users Online</div>
      <div className="buttons">{this._renderColorList()}</div>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} />
      </div>
    );
  }

  _changeColor = newColor => e => {
    const colorMsg = {
      type: "colorChange",
      user: this.state.currentUser.name,
      newColor: newColor,
      content: this.state.currentUser.name + " changed their colour to " + newColor
    }
    console.log(colorMsg);
    this.socket.send(JSON.stringify(colorMsg));
  }

  _renderColorList = () => {
    return this.state.colors.map( c =>(
      <button key={c} onClick={this._changeColor(c)}>{c}</button>)
    );
  }



}

export default App;
