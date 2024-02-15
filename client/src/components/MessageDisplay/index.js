import './style.css';
import React, {useEffect, useState} from 'react';

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchmessage = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/message');
        const res = await response.json();
        setMessages(res.data.message);
      } catch (error) {
        console.error('Error fetching message: ', error);
      }
    };
    // TODO: only fetch message for the current room
    fetchmessage();
  }, []);

  return (
    <div className="message-display">
      {messages.map((message) => (
        <p className="message" key={message._id}>
          User: {message._id}
          <br />
          {message.message}
        </p>
      ))}
    </div>
  );
};

export default MessageDisplay;
