import React, {Component} from 'react';





export default class Message extends Component {


  render(){
    const setStyle = {
      color: this.props.color
    }

    return (
      <div className="message">
        <span className="message-username" style={setStyle}>{this.props.user}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      );
  }

}