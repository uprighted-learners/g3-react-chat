import './style.css';
import React, { useEffect, useState } from 'react

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from the API
  }, []);

  return (
    <div>
      <h1>Rooms List</h1>
        {rooms.map((room) => (
          <button className="room" key={room._id}>{room.name}</button>
        ))}
    </div>
  );
};

export default RoomsList;