import './style.css';
import {useState} from 'react';
import MessageForm from '../MessageForm';
function Message(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(props.body.message);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/message/delete/${id}`, {
      method: 'DELETE',
    });
    props.setRefresh((refresh) => !refresh);
  };

  return (
    <div className="message" key={props.body._id}>
      <div className="name">
        {props.body.userName}
        <div className="modify">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(props.body._id)}>Delete</button>
        </div>
      </div>
      {isEditing ? <MessageForm newMessage={newMessage} setNewMessage={setNewMessage} setIsEditing={setIsEditing} message={props.body.message} messageId={props.body._id} setRefresh={props.setRefresh} /> : <div className="text">{props.body.message}</div>}
    </div>
  );
}

export default Message;
