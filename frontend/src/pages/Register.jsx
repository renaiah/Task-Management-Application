import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select className="form-control" name="role" onChange={handleChange} value={form.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );

};

export default Register;
