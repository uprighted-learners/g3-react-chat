import './style.css';

function ChatBox(props) {
  function handleOnSend(evt) {
    evt.preventDefault();
    console.log('hello world');
    // const {userId, roomId, message} = props;
    // send message to server, call postData function
    /**
     * body: {userId: userId, roomId: roomId, message: message}
     * For more options for fetch see: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     */
    // clear input fields
    // update message display state
  }

  return (
    <div className="chat-box">
      <form onSubmit={handleOnSend}>
        <input type="text" />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
