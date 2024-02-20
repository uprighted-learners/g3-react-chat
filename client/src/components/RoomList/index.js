import './style.css';
import React, {useEffect} from 'react';

const RoomsList = (props) => {
  useEffect(() => {
    // TODO: fetch all rooms that user has access to
    props.addAllRooms();
  }, []);

  return (
    <div className="room-list-layout">
      {props.rooms.map((room) => (
        <button
          className="room"
          key={room._id}
          onClick={() => {
            props.selectRoom(room);
          }}
        >
          {room.name}
        </button>
      ))}
    </div>
  );
};

export default RoomsList;
