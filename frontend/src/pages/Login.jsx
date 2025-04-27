import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/tasks';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-warning" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
