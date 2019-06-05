import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './notification.jsx';

export default class MessageList extends Component {
  render() {
    const mess = this.props.messages;

      const ms = mess.map( message => {
        if (message.type === "incomingMessage"){
            return <Message key={message.id}
                            user={message.username}
                            content={message.content} />
        } else {
            return <Notification key={message.id}
                                 content={message.content} />
        }
      })

    return (
      <main className="messages">
        {ms}
      </main>
      );
  }
}