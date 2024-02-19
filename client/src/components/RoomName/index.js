import './styles.css';
function RoomName() {
  let roomName = JSON.parse(localStorage.getItem('roomInfo'));
  return <div className="room-name">{roomName.name}</div>;
}

export default RoomName;
