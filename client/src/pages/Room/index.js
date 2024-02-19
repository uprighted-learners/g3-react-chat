import './style.css';
import RoomList from '../../components/RoomList';
import MessagePane from '../../layout/MessagePane';
import Profile from '../../components/Profile';
import NavPane from '../../layout/NavPane';
import MessageDisplay from '../../components/MessageDisplay';
import ChatBox from '../../components/ChatBox';
import {useEffect, useState} from 'react';

function Room() {
  const [isLoading, setIsLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [messagesData, setMessagesData] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  async function fetchMessage(roomId) {
    // fetch messages based on room
    try {
      const response = await fetch(`http://localhost:8080/api/message/${roomId}`);
      const res = await response.json();
      return res.data;
    } catch (error) {
      console.error('Error fetching message: ', error);
    }
  }

  async function fetchUser(userId) {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`);
      const res = await response.json();
      return res.data.firstName + ' ' + res.data.lastName;
    } catch (error) {
      console.error('Error fetching message: ', error);
    }
  }

  const fetchRooms = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/room/${roomId}`);
      const res = await response.json();
      return res.data.rooms;
    } catch (error) {
      console.error('Error fetching rooms: ', error);
    }
  };

  async function selectRoom(room) {
    setIsLoading(true);
    setCurrentRoom(room);
  }

  async function addAllRooms() {
    const roomsData = await fetchRooms('');
    setRooms(roomsData);
  }

  useEffect(() => {
    if (send) {
      setSend(false);
    }
  }, [send, setSend]);

  useState(() => {
    // set up
    const setup = async () => {
      const roomsData = await fetchRooms('');
      selectRoom(roomsData[0]);
    };
    setup();
  });

  return (
    <div className="room-layout">
      <NavPane>
        <RoomList selectRoom={selectRoom} addAllRooms={addAllRooms} rooms={rooms} fetchRooms={fetchRooms} currentRoom={currentRoom} />
        <Profile />
      </NavPane>
      <MessagePane>
        <MessageDisplay send={send} messagesData={messagesData} setMessagesData={setMessagesData} fetchMessage={fetchMessage} fetchUser={fetchUser} currentRoom={currentRoom} isLoading={isLoading} setIsLoading={setIsLoading} />
        <ChatBox setSend={setSend} />
      </MessagePane>
    </div>
  );
}

export default Room;
