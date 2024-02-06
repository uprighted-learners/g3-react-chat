// components/MessageForm.js
import React, { useState, useEffect } from 'react';

const Messages = ({ roomId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        //need to getMessages from DB
        // const response = await get(`/rooms/${roomId}/messages`);
        // setMessages(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchMessages();
  }, [roomId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <strong>{message.user.firstName} {message.user.lastName}:</strong> {message.body}
        </div>
      ))}
    </div>
  );
};

const MessageForm = ({ roomId }) => {
  const [body, setBody] = useState('');
  const history = Messages;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post(`/rooms/${roomId}/messages`, { body });
      setBody('');
      history.push(`/rooms/${roomId}/messages`);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='message-body'>Message:</label>
      <input
        type='text'
        id='message-body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type='submit'>Send</button>
    </form>
  );
};

export default MessageForm;
export default Messages;