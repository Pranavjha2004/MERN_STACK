import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../axios'; // your axios instance
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);


  const { updateUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', formData);
      if (res.status === 200) {
        updateUser(res.data.user);
        navigate('/');
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password}  onChange={handleChange} required /> 
        </div>
        <button type="submit" disabled={loading} > {loading? "Logging In.." : "Login"}</button>
      </form>
    </>
  )
}

export default Login