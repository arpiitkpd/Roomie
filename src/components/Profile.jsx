import React from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input, Select} from './index.js'
import appwriteService from '../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

 function Profile({post}) {
    const {register, handleSubmit}= useForm({
        defaultValues:{
            owner: post?.owner|| "",
            address: post?.address || "",
            conditions: post?.conditions || "",
            rent: post?.rent || 0,
            description: post?.description || "",
            flatSize: post?.flatSize||"",
            status: post?.status || 'active',
            Gender: post?.Gender || "Male"
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
   
  return (
    <div>profileForm</div>
  )
}
export default Profile
