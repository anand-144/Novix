import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const auth = response.data;

      if (auth.token) {
        localStorage.setItem('token', auth.token);
      
        // Auto logout after 1 hour
        setTimeout(() => {
          localStorage.removeItem('token');
          toast.error("Session expired");
          navigate("/");
        }, 3600000); // 1 hour
      
        toast.success("Hi Admin");
      
        // Delay navigation to allow toast to show
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500); // 1.5 seconds delay
      }
      
    } catch (error) {
      toast.error("Please provide a valid email and password");
      console.error(error);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded px-6 py-8'>
        <ToastContainer />
        <h2 className='text-2xl font-semibold mb-6 text-center underline'>
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type='text'
              id='username'
              placeholder='Enter username'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.username && (
              <p className='text-red-500 text-xs italic mt-1'>
                Username is required.
              </p>
            )}
          </div>

          <div className='mb-5 relative'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              id='password'
              placeholder='Enter password'
              className='shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.password && (
              <p className='text-red-500 text-xs italic mt-1'>
                Password is required.
              </p>
            )}
            <div
              className='absolute right-0 top-9 pr-3 flex items-center cursor-pointer'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEyeSlash className='text-gray-600' />
              ) : (
                <FaEye className='text-gray-600' />
              )}
            </div>
          </div>

          <div className='mb-6 w-full'>
            <button
              type='submit'
              className='w-full bg-primary hover:bg-secondary text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none'
            >
              Login
            </button>
          </div>
        </form>

        <p className='mt-4 text-center text-gray-500 text-sm flex items-center justify-center gap-1'>
          © 2025 Novix. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
