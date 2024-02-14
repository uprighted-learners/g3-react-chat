import RoomList from '../RoomList';
import ChatUI from '../ChatUI';
import './style.css';

function Room() {
  return (
    <div className="room-layout">
      {/* room list should be on the side of chatUI */}
      <RoomList />
      <ChatUI />
    </div>
  );
}

export default Room;
