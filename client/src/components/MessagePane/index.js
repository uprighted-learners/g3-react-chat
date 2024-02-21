import './style.css';

function MessagePane(props) {
  return <div className="message-pane-layout">{props.children}</div>;
}

export default MessagePane;
