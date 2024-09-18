import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({props}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })
    }
  return (
    <button
    onClick={logoutHandler}
    {...props}
   
    >Logout</button>
  )
}

export default LogoutBtn