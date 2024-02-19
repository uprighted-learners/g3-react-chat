import './style.css';

function ChatBox(props) {
  const handleOnSend = async (evt) => {
    evt.preventDefault();

    const userId = JSON.parse(localStorage.getItem('userInfo')).user._id;
    const roomId = JSON.parse(localStorage.getItem('roomInfo')).room._id;
    const message = evt.target.userMessage.value;
    try {
      const response = await fetch('http://localhost:8080/api/message/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, roomId, message}),
      });
      const res = await response.json();
      if (res.success === true) {
        props.setSend(true);
        evt.target.userMessage.value = '';
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="chat-box">
      <form onSubmit={handleOnSend}>
        <input type="text" name="userMessage" />
        <button>Send</button>
      </form>
    </div>
  );
}
export default ChatBox;
