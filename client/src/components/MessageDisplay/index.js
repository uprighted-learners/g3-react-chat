import './style.css';
import React, {useEffect, useState, useRef} from 'react';

const MessageDisplay = (props) => {
  const [messages, setMessages] = useState([]);
  const messageDisplayRef = useRef(null);

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
  }, [props.send]);

  useEffect(() => {
    if (messageDisplayRef.current) {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="room-layout">
      <div className="message-display" ref={messageDisplayRef}>
        {messages.map((message) => (
          <p className="message" key={message._id}>
            User: {message.userId}
            <br />
            {message.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MessageDisplay;
