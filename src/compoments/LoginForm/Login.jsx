import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import statement

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const token = localStorage.getItem('skillLinkJwtToken');
    if (token) {
      try {
        // Decode the JWT token to check its validity
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp > currentTime) {
          const userId = decodedToken.UserID; // Adjust this if the claim name is different
          // Redirect to ProfilePage with the userId
          navigate(`/${userId}`);
        } else {
          // Token is expired, remove it and stay on the login page
          localStorage.removeItem('skillLinkJwtToken');
        }
      } catch (err) {
        // Handle invalid token or decoding errors
        localStorage.removeItem('skillLinkJwtToken');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your backend API to authenticate
      const response = await axios.post('https://localhost:44334/api/v1.0/Auth/Login/login', {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token); // Store the token and log in

        // Decode the JWT token to get the userId
        const decodedToken = jwtDecode(response.data.token);
        const userId = decodedToken.UserID; // Adjust this if the claim name is different

        // Redirect to ProfilePage with the userId
        navigate(`/${userId}`);
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="mt-8">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
