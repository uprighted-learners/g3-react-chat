import './style.css';
import RoomList from '../../components/RoomList';
import MessagePane from '../../layout/MessagePane';
import Profile from '../../components/Profile';
import NavPane from '../../layout/NavPane';
import MessageDisplay from '../../components/MessageDisplay';
import ChatBox from '../../components/ChatBox';
import {useEffect, useState} from 'react';

function Room() {
  // every time send is true, update the messages state with the new message,
  // then set send to false again
  const [send, setSend] = useState(false);

  useEffect(() => {
    if (send) {
      setSend(false);
    }
  }, [send, setSend]);

  return (
    <div className="room-layout">
      <NavPane>
        <RoomList />
        <Profile />
      </NavPane>
      <MessagePane>
        <MessageDisplay send={send} />
        <ChatBox setSend={setSend} />
      </MessagePane>
    </div>
  );
}

export default Room;
