import RoomList from '../RoomList';
import './style.css';

function Room() {
  return (
    <div className="room-layout">
      <RoomList />
      <div className="message-box">Chat messages here</div>
      <div className="chat-box">
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Room;
