import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Common styles for Login and Signup

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
      
      alert('Signup successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button onClick={handleSignup} className="form-button">
          Sign Up
        </button>
        <p className="form-footer">
          Already have an account? <span onClick={() => navigate('/')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
