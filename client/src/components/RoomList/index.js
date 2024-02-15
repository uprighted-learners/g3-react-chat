import './style.css';
import React, {useEffect, useState} from 'react';

const RoomsList = (props) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/room');
        const res = await response.json();
        setRooms(res.data.rooms);
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
