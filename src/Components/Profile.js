import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    document.title = "Profile";
  }, [navigate]);
  let user = useState(JSON.parse(localStorage.getItem("user")));
  user = user[0];

  return (
    <div className="profile-container">
      {user && (
        <div className="user-info">
          <h1>{user.firstName} {user.lastName}</h1>  
          <div>
            ID: <span>{user.id}</span>
          </div>
          <div>
            Username: <span>{user.username}</span>
          </div>
          <div>
            Email: <span>{user.email}</span>
          </div>
          <div>
            Gender: <span>{user.gender}</span>
          </div>
            <button onClick={() => {
                localStorage.removeItem("user");
                navigate("/")
            }}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
