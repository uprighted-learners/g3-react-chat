import './style.css';
import React, {useEffect, useRef} from 'react';

const MessageDisplay = (props) => {
  const messageDisplayRef = useRef(null);

  useEffect(() => {
    const addUserName = async () => {
      try {
        let currentRoom = JSON.parse(localStorage.getItem('roomInfo'));
        let fetchedMessages = await props.fetchMessage(currentRoom._id);
        const promises = fetchedMessages.message.map(async (messageInfo) => {
          const userName = await props.fetchUser(messageInfo.userId);
          messageInfo.userName = userName;
        });
        await Promise.all(promises);
        props.setMessagesData(fetchedMessages);
        props.setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    addUserName();
  }, [props.send, localStorage.getItem('roomInfo')]);

  useEffect(() => {
    // scroll to bottom when messages change
    if (messageDisplayRef.current) {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    }
  }, [props.messagesData]);

  return (
    <div className="room-layout">
      <div className="message-display" ref={messageDisplayRef}>
        {props.isLoading ? (
          <p>Loading...</p>
        ) : props.messagesData.message.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          props.messagesData.message.map((body) => (
            <div className="message" key={body._id}>
              <div className="name">{body.userName}</div>
              <div className="text">{body.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageDisplay;
