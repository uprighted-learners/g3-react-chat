import RoomList from '../../components/RoomList';
import ChatUI from '../../components/ChatUI';
import Profile from '../../components/Profile';
import './style.css';
import NavPane from '../../components/NavPane';

function Room() {
  return (
    <div className="room-layout">
      {/* room list should be on the side of chatUI */}
      <NavPane>
        <RoomList />
        <Profile />
      </NavPane>
      <ChatUI />
    </div>
  );
}

export default Room;
