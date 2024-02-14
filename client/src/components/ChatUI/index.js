import './style.css';

function ChatUI() {
  return (
    <div className="chat-ui-layout">
      <div className="message-box">Chat messages here</div>
      <div className="chat-box">
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatUI;
