import React from 'react'
import { useSelector } from 'react-redux';
import { useChat } from '../hook/useChat'; 
import { useEffect } from 'react';

const Dashboard = () => {

  const { initializeSocket } = useChat();

  useEffect(() => {
    initializeSocket();
  }, []);
  const { user } = useSelector((state) => state.auth);
    console.log("Dashboard User:", user); 
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
