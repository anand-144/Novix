import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      await registerUser(data.email, data.password);
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setMessage("Password should be at least 6 characters.");
      } else {
        setMessage("Please provide a valid email and password.");
      }
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google registration has failed!");
      console.log(error);
    }
  };

  return (
    <div className='min-h-[calc(100vh-120px)] flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded px-6 py-8'>
        <h2 className='text-2xl font-semibold mb-6 text-center underline'>
          <span className='text-yellow-500'>Please</span> Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { 
                required: "Email is required", 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: "Invalid email address" 
                } 
              })}
              type='email'
              id='email'
              placeholder='Enter email'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.email && (
              <p className='text-red-500 text-xs italic mt-1'>{errors.email.message}</p>
            )}
          </div>

          <div className='mb-5 relative'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { 
                required: "Password is required", 
                minLength: { 
                  value: 6, 
                  message: "Password must be at least 6 characters long" 
                } 
              })}
              type={showPassword ? "text" : "password"}
              id='password'
              placeholder='Enter password'
              className='shadow appearance-none border rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.password && (
              <p className='text-red-500 text-xs italic mt-1'>{errors.password.message}</p>
            )}
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

          <div className='mb-5'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", { required: "Please confirm your password" })}
              type={showPassword ? "text" : "password"}
              id='confirmPassword'
              placeholder='Confirm password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-xs italic mt-1'>{errors.confirmPassword.message}</p>
            )}
          </div>

          {message && (
            <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          )}

          <div className='mb-6'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-primary hover:bg-secondary text-black hover:text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50'
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className='text-center text-md font-medium mb-4'>
          Already have an account? Please{' '}
          <Link to="/login" className='text-blue-500 hover:text-blue-700'>
            Login
          </Link>
        </p>

        <div className='mb-6'>
          <button
            onClick={handleGoogleSignIn}
            className='w-full flex items-center justify-center gap-2 bg-secondary hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded focus:outline-none'
          >
            <FcGoogle className='text-xl' />
            Register with Google
          </button>
        </div>

        <p className='mt-4 text-center text-gray-500 text-sm flex items-center justify-center gap-1'>
          © 2025 Novix. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
