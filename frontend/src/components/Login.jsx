import React, { useState } from 'react'
import { Link } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { FaRegCopyright } from "react-icons/fa";

const Login = () => {

    const [message, setMessage] = useState('')

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md shadow-secondary rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4 text-center underline'>Login</h2>

            <form>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                        Email
                    </label>
                    <input type='email' name="email" id='email' placeholder='Enter email'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                    />
                </div>
                
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                        Password
                    </label>
                    <input type='password' name="password" id='password' placeholder='Enter password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                    />
                </div>

                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }

                <div className=''>
                    <button className='bg-primary hover:bg-secondary text-black hover:text-white font-bold py-2 px-8 rounded-md focus:outline-none'>Login</button>
                </div>
            </form>

            <p className='align-baseline font-medium mt-4 text-md'>Haven't an account? Please
            <Link to="/register" className='text-blue-500 hover:text-blue-700'> Register</Link>
            </p>

            {/*Google Login*/}

            <div className='mt-4'>
                <button className='w-full flex flex-wrap gap-1 items-center justify-center
                 bg-secondary hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    <FcGoogle className='mr-2'/>
                    Sign in with Google
                </button>
            </div>

            <p className='mt-4 text-center text-gray-500 text-sm'>
            © 2025 Novix. All rights reserved.
            </p>

        </div>
    </div>
  )
}

export default Login