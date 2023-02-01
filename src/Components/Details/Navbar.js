import React from 'react'
import '../../Styles/Details/Navbar.css'
import { useNavigate } from "react-router-dom";
import Login from './Login';

function Navbar() {
  const navigate = useNavigate()

  const home = () => {
    navigate(`/`)
  }

 
  return (
    <>
      <div className='container-fluid navbar'>
        <div>
          <div className='float-start logo2 text-center' onClick={home}>e!</div>
        </div>
        <div className='d-inline-block float-end'>
          <Login/>
        </div>
      </div>
    </>
  )
}

export default Navbar