import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
    console.log("Dashboard User:", user); // ✅ Debugging log
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
