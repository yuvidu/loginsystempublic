import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import logo from '../images/Wikimedia_Brand_Guidelines_Update_2022_Wikimedia_Logo_Brandmark.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the backend login route
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: username, password: password }),
    });

    if (response.ok) {
      const userData = await response.json();

      // Fetch employee data from employee_master
      const userInfoResponse = await fetch(
        `http://localhost:5000/user/${userData.id}`
      );

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();

        // Navigate to the UserInfoPage with both user data and employee info
        navigate('/logininfo', { state: { userData, userInfo } });
      } else {
        setError('Failed to fetch user information.');
      }
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div>
      <center>
      <img src={logo} alt="Logo" className="login-logo" />

      <h1>User varification System</h1>
      <form onSubmit={handleSubmit}>
        <div>
         
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            placeholder="Enter your password"
            
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      </center>
    </div>
    
  );
};

export default LoginPage;
