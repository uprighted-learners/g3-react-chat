import './style.css'
import React, { useEffect, useState } from 'react'

const RoomsList = () => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/room')
        const res = await response.json()
        setRooms(res.data.rooms)
      } catch (error) {
        console.error('Error fetching rooms: ', error)
      }
    }

    fetchRooms()
  }, [])

  return (
    <div className='room-list-layout'>
      {rooms.map((room) => (
        <button className='room' key={room._id}>
          {room.name}
        </button>
      ))}
    </div>
  )
}

export default RoomsList
