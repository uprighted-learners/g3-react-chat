import './style.css';
import RoomList from '../../components/RoomList';
import MessagePane from '../../layout/MessagePane';
import Profile from '../../components/Profile';
import NavPane from '../../layout/NavPane';
import MessageDisplay from '../../components/MessageDisplay';
import ChatBox from '../../components/ChatBox';
import {useEffect, useState} from 'react';

function Room() {
  const [send, setSend] = useState([false]);

  // everytime send is true, update Message display, then set it false again
  // useEffect(() => {
  //   if (send) {
  //     MessageDisplay();
  //     setSend(false);
  //   }
  // }, [send, setSend]);

  return (
    <div className="room-layout">
      <NavPane>
        <RoomList />
        <Profile />
      </NavPane>
      <MessagePane>
        <MessageDisplay />
        <ChatBox send={send} setSend={setSend} />
      </MessagePane>
    </div>
  );
}

export default Room;
