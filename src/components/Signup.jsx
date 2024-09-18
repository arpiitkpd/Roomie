import React , {useState} from "react"
import { useNavigate, Link} from "react-router-dom"
import { login } from "../store/authSlice.js"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import {Input, Logo,Button } from './index.js'
import authService from "../appwrite/auth.js"

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
  
    <div className="grid text-black place-items-center">
      <div style={{background:"#f8f8f8f2"}} className="w-11/12 p-12  sm:w-8/12 md:w-1/2 lg:w-5/12">
      <div className="inline-flex content-center mb-5" style={{width:"100%", justifyContent: "center"}}>
      <div className="_o6689fn" 
                ><div className="hidden md:block">
                    <div width="52" height="20" className='flex justify-center'>
                        <img src="./public/logo.svg" style={{maxWidth:"30%"}} alt="" />
                    </div>
                </div>
                <div className="block md:hidden">
                <div width="30" height="10" className='flex justify-center'>
                        <img src="./public/logo.svg" style={{maxWidth:"30%"}} alt="" />
                    </div>
                </div>
            </div>
            </div>
        <h1 className="text-3xl flex mb-3 font-bold justify-center">Welcome to Family</h1>
        <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit"
                        className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            Create Account
                        </Button>
                        <Link to="/login" className="flex justify-between mt-1 text-xs text-gray-700 cursor-pointer hover:text-black">Already have account? SignIn</Link>
                    </div>
        </form>
       
      </div>
    </div>
  )
}

export default Signup