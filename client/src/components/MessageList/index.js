import Message from '../Message';
function MessageList(props) {
  return props.messages.map((body) => <Message body={body} setRefresh={props.setRefresh} />);
}
export default MessageList;
