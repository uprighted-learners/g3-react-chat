import './style.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import MessageForm from '../MessageForm'
function Message(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [newMessage, setNewMessage] = useState(props.body.message)

  // NOTE: you should not be able to delete other people's messages
  const handleDelete = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')).user
    if (userInfo.isAdmin === true || props.body.userId === userInfo._id) {
      await fetch(`http://localhost:8080/api/message/delete/${id}`, {
        method: 'DELETE',
      })
      props.setRefresh((refresh) => !refresh)
    } else {
      return alert("You cannot delete other people's messages")
    }
  }

  return (
    <div className='message' key={props.body._id}>
      <div className='name'>
        {props.body.userName}
        <div className='modify'>
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => handleDelete(props.body._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {isEditing ? (
        <MessageForm
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          setIsEditing={setIsEditing}
          message={props.body.message}
          messageId={props.body._id}
          setRefresh={props.setRefresh}
        />
      ) : (
        <div className='text'>{props.body.message}</div>
      )}
    </div>
  )
}

export default Message
