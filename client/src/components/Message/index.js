import './style.css';
function Message(props) {
  const handleEdit = async (id) => {
    // TODO: edit message
  };

  const handleDelete = async (id) => {
    // TODO: delete message by id then refetch messages
    await fetch(`http://localhost:8080/api/message/delete/${id}`, {
      method: 'DELETE',
    });
    props.setRefresh((prev) => !prev);
  };

  return (
    <div className="message" key={props.body._id}>
      <div className="name">
        {props.body.userName}
        <div className="modify">
          <button className="edit" onClick={() => handleEdit(props.body._id)}>
            Edit
          </button>
          <button className="delete" onClick={() => handleDelete(props.body._id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="text">{props.body.message}</div>
    </div>
  );
}

export default Message;
