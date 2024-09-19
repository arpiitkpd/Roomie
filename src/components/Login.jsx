import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Logo, Input, Button } from './index.js';
import authService from '../appwrite/auth.js';
import { login as authLogin} from '../store/authSlice.js';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const userStatus = useSelector((state)=>state.prof.status)
  
  console.log(userStatus)

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin({ userData: user }));
          
          // Fetch profile and navigate based on the result
          try {
            if(userStatus){
              navigate("/")
            }else{
              navigate("/profile-form")
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            setError('Failed to fetch profile.');
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="grid place-items-center text-black">
      <div style={{ background: "#f8f8f8f2" }} className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <div className="inline-flex content-center mb-5" style={{ width: "100%", justifyContent: "center" }}>
          <div className="_o6689fn">
            <div className="hidden md:block">
              <div width="52" height="20" className='flex justify-center'>
                <img src="./public/logo.svg" style={{ maxWidth: "30%" }} alt="" />
              </div>
            </div>
            <div className="block md:hidden">
              <div width="30" height="10" className='flex justify-center'>
                <img src="./public/logo.svg" style={{ maxWidth: "30%" }} alt="" />
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-7">Hello there ?, <span className="font-normal">please fill in your information to continue</span></h1>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6+">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              {...register("email", { required: true })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password"
              className='block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner'
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
              Sign in{" "}
            </Button>
            <Link to="/signup" className="flex justify-between mt-1 text-xs text-gray-700 cursor-pointer hover:text-black">Don't have an account? Create One</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
