import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      Dashboard Page
      user: {user? user.username : "Not logged in"}
    </>
    
  )
}

export default Dashboard