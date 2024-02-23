import './style.css';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';

const RoomsList = (props) => {
  function handleUpdate() {
    // TODO: do a pop up form to update room
  }
  useEffect(() => {
    props.addAllRooms();
  }, []);

  return (
    <div className="room-list-layout">
      {props.rooms.map((room) => (
        <div className="room-name-layout">
          <button
            className="room-name-btn"
            key={room._id}
            onClick={() => {
              props.selectRoom(room);
            }}
          >
            {room.name}
          </button>
          <button className="room-update" onClick={handleUpdate}>
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
