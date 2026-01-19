import React from 'react'

const Signup = () => {
    return (
        <>
            <div className=' bg-[#dbecff] min-h-screen p-20 flex justify-center '>
                <div className=' w-100 h-150 items-center pt-10 space-y-4'>
                    <div className='flex items-center justify-center'> <span class="material-symbols-outlined scale-[5]">
                        account_circle
                    </span></div>

                    <p className='font-bold text-black text-4xl text-center pt-10'>Create Account</p>
                    <p className='text-black font-medium text-2xl text-center '>Join us to get started!</p>

                    <div className='space-y-4 pt-10 grid place-items-center'>
                        <div className="relative w-90 sm:-w-100 items-center justify-center">
                            {/* Icon */}
                            {/* <span className="material-symbols-outlined absolute left-3 text-gray-400 top-1/2 -translate-y-1/2">
                                person
                            </span> */}

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-full bg-white shadow-md pl-10 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="relative w-90 sm:-w-100 ">
                            {/* <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                mail
                            </span> */}

                            <input
                                type="email"
                                placeholder="Email"
                                className=" w-full rounded-full bg-white  shadow-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black " />
                        </div>
                        <div className="relative w-90 sm:-w-100 ">


                            <input
                                type="password"
                                placeholder="Password"
                                className=" w-full rounded-full bg-white shadow-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>

                    <div className='flex items-center justify-center mt-10'>
                        <button
                            type='submit'
                            className=' p-4 w-90 sm:-w-100 rounded-[100px] shadow-2xl bg-blue-600  text-white  font-bold text-lgl hover:bg-blue-700 cursor-pointer'
                        >
                            Sign Up
                        </button>
                    </div>



                </div>

            </div >
        </>
    )
}

export default Signup
