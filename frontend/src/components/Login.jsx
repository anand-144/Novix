import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Please provide a valid email and password.");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-in failed!");
      console.log(error);
    }
  };

  return (
    <div className='min-h-[calc(100vh-120px)] flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded px-6 py-8'>
        <h2 className='text-2xl font-semibold mb-6 text-center underline'>
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type='email'
              id='email'
              placeholder='Enter email'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.email && (
              <p className='text-red-500 text-xs italic mt-1'>
                Email is required.
              </p>
            )}
          </div>

          <div className='mb-5 relative'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor="password"
            >
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
            {/* Eye Toggle Icon Positioned in the Center */}
            <div
              className='absolute right-0 bottom-0.5 transform -translate-y-1/2 pr-3 flex items-center cursor-pointer'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEyeSlash className='text-gray-600' />
              ) : (
                <FaEye className='text-gray-600' />
              )}
            </div>
          </div>

          <div className='mb-6'>
            <button
              type='submit'
              className='w-full bg-primary hover:bg-secondary text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none'
            >
              Login
            </button>
          </div>
        </form>

        <p className='text-center text-md font-medium mb-4'>
          Haven't an account? Please{" "}
          <Link to="/register" className='text-blue-500 hover:text-blue-700'>
            Register
          </Link>
        </p>

        {/* Google Login */}
        <div className='mb-6'>
          <button
            onClick={handleGoogleSignIn}
            className='w-full flex items-center justify-center gap-2 bg-secondary hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded focus:outline-none'
          >
            <FcGoogle className='text-xl' />
            Sign in with Google
          </button>
        </div>

        <p className='mt-4 text-center text-gray-500 text-sm flex items-center justify-center gap-1'>
          © 2025 Novix. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
