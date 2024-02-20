import React, {useEffect, useState} from 'react';
import './styles.css';

function RoomName(props) {
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const fetchRoomName = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const storedRoomInfo = JSON.parse(localStorage.getItem('roomInfo'));
      if (storedRoomInfo) {
        setRoomName(storedRoomInfo.name);
      }
    };
    fetchRoomName();
  }, [props.selectRoom]);

  return <div className="room-name">{roomName}</div>;
}

export default RoomName;
