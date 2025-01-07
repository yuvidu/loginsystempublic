import React from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';  
import './UserInfo.css';
import logo from '../images/Wikimedia_Brand_Guidelines_Update_2022_Wikimedia_Logo_Brandmark.png';

const UserInfoPage = () => {
  const location = useLocation();  
  const { userData, userInfo } = location.state || {};  
  const navigate = useNavigate(); 

  // Check if userData and userInfo exist
  if (!userData || !userInfo) {
    return <p>No user data or user info found.</p>;
  }


  const handleClose = () => {
    navigate('/');  // Navigate to the login page 
  };

  return (
    <div>
      <center>
      <img src={logo} alt="Logo" className="login-logo" />
      <h1>User varification System</h1>
      
      <p><strong> Name:</strong> {userInfo.calling_name}</p>
      <p><strong>Address:</strong> {userInfo.address}</p>
      <p><strong>Phone:</strong> {userInfo.phone}</p>

      <button onClick={handleClose}>Close and Go Back</button>
      </center>
    </div>
  );
};

export default UserInfoPage;
