import './style.css';
import React, {useEffect, useState} from 'react';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('./server/routes/api/rooms');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms: ', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Rooms List</h1>
      {rooms.map((room) => (
        <button className="room" key={room._id}>
          {room.name}
        </button>
      ))}
    </div>
  );
};

export default RoomsList;
