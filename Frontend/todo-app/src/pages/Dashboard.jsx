import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from '../axios' // your axios instance
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/logout');
      if (res.status === 200) {
        updateUser(null); // Clear user data
        navigate('/login'); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
     console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
   }

  return (
    <>
      Dashboard Page
      user: {user? user.username : "Not logged in"}
      <br />
      <button onClick={handleLogout}>{ loading? "Logging out..." : "Logout"}</button>
    </>
    
  )
}

export default Dashboard