import './style.css';

function RoomList(props) {
  return (
    <>
      <div className="room-list">
        <button className="room">This is a room</button>
        <button className="room">This is a another room</button>
        {props.children}
      </div>
    </>
  );
}

export default RoomList;
