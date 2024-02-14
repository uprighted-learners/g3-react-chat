import RoomList from '../../components/RoomList';
import ChatUI from '../../components/ChatUI';
import Profile from '../../components/Profile';
import './style.css';

function Room() {
  return (
    <div className="room-layout">
      {/* room list should be on the side of chatUI */}
      <RoomList>
        <Profile />
      </RoomList>
      <ChatUI />
    </div>
  );
}

export default Room;
