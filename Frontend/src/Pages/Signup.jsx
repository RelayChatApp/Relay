import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <div className="bg-[#dbecff]  flex justify-center items-center">
                <div className='min-h-screen'>
                    <h1 className='font-extrabold text-5xl mt-5 text-center fascinate-regular'>Relay</h1>
                    {/* Logo */}
                    <div className='flex justify-center mt-5'>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/6016/6016788.png"
                            alt="Logo"
                            className='w-40 h-40'
                        />
                    </div>

                    {/* Headings */}

                    <h3 className='mt-5 font-bold text-3xl text-center'>Create Account!!</h3>

                    <p className='mt-1 text-center text-gray-400'>
                        Already a {" "}
                        <Link to="/">
                            <span className='text-blue-600'>
                                user?
                            </span>
                        </Link>
                    </p>
                    <br />
                    <form className=' w-screen'>
                        <div className='flex items-center justify-center'>
                            <input
                                type="text"
                                name="fullName"
                                placeholder='Full Name'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold '

                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm Password'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold '

                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center '>
                            <button
                                type='submit'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-blue-600  text-white  font-bold text-lg'
                            >
                                Create Account
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
