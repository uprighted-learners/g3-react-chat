import './style.css';
import RoomList from '../../components/RoomList';
import MessagePane from '../../layout/MessagePane';
import Profile from '../../components/Profile';
import NavPane from '../../layout/NavPane';
import MessageDisplay from '../../components/MessageDisplay';
import ChatBox from '../../components/ChatBox';
import RoomName from '../../components/RoomName';
import {useEffect, useState} from 'react';

function Room() {
  const [isLoading, setIsLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [messagesData, setMessagesData] = useState([]);
  const [rooms, setRooms] = useState([]);

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
    // change background of button
    // TODO: remove user from previous room and add user to selected room
    localStorage.setItem('roomInfo', JSON.stringify(room));
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
      // default room is at index 0
      selectRoom(roomsData[0]);
    };
    setup();
  });

  return (
    <div className="room-layout">
      <NavPane>
        <RoomList selectRoom={selectRoom} addAllRooms={addAllRooms} rooms={rooms} fetchRooms={fetchRooms} />
        <Profile />
      </NavPane>
      <MessagePane>
        <RoomName />
        <MessageDisplay send={send} messagesData={messagesData} setMessagesData={setMessagesData} fetchMessage={fetchMessage} fetchUser={fetchUser} isLoading={isLoading} setIsLoading={setIsLoading} />
        <ChatBox setSend={setSend} />
      </MessagePane>
    </div>
  );
}

export default Room;
