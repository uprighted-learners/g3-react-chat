import './style.css';

function Profile() {
  let data = localStorage.getItem('userInfo');
  data = JSON.parse(data);
  return <div className="profile">{data.user.firstName + ' ' + data.user.lastName}</div>;
}

export default Profile;
