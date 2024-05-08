import React from 'react';
import './Navigation.css'
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className='NavigationBar'>
        <p className='welcome'>Welcome, Manik</p>
        <button className='logoutbtn' onClick={logout}>Logout</button>
    </div>
  )
}
