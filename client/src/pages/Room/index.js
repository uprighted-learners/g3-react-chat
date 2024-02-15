import RoomList from '../../components/RoomList';
import MessagePane from '../../components/MessagePane';
import Profile from '../../components/Profile';
import './style.css';
import NavPane from '../../components/NavPane';
import MessageDisplay from '../../components/MessageDisplay';

function Room() {
  return (
    <div className="room-layout">
      {/* room list should be on the side of MessagePane */}
      <NavPane>
        <RoomList />
        <Profile />
      </NavPane>
      <MessagePane>
        <MessageDisplay />
        <div className="chat-box">
          <input type="text" />
          <button>Send</button>
        </div>
      </MessagePane>
    </div>
  );
}

export default Room;
