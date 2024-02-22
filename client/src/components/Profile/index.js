import './style.css';

function Profile(props) {
  let data = localStorage.getItem('userInfo');
  data = JSON.parse(data);
  return (
    <div className="profile">
      {data.user.firstName + ' ' + data.user.lastName}
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
