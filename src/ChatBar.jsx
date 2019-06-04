import React, {Component} from 'react';

export default class ChatBar extends Component {



  render(){
    const msg = this.props.handleNewMessage;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this.props.handleNewMessage} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.handleNewMessage} />
      </footer>
      );
  }

}