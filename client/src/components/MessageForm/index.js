function MessageForm(props) {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newMessage = evt.target.newMessage.value;
    const messageId = props.messageId;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const response = await fetch('http://localhost:8080/api/message/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user, messageId, newMessage}),
      });
      if (!response.ok) {
        alert(response.message);
      }
      // Bug: response should give status 403 if user is not an admin
      console.log(response);
      console.log(newMessage, messageId);
      console.log(user);
      props.setRefresh((refresh) => !refresh);
      props.setIsEditing(false);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input type="text" defaultValue={props.message} name="newMessage" />
      <button type="submit">Submit</button>
      <button onClick={() => props.setIsEditing(false)}>Cancel</button>
    </form>
  );
}
export default MessageForm;
