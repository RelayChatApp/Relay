import React from 'react'


const Login = () => {
    return (<>
        <div className='flex justify-center bg-[#dbecff] min-h-screen'>
            <div>
                <h1 className='font-extrabold text-5xl mt-5 text-center fascinate-regular'>Relay</h1>

                {/* Logo */}
                <div className='flex justify-center mt-5'>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6016/6016788.png"
                        alt="Logo"
                        className='w-40 h-40'
                    />
                </div>
                <h3 className='mt-5 font-bold text-3xl text-center'>Welcome Back!!</h3>
                <h4
                    className='mt-1 text-center text-gray-400'>Not a
                    <Link to="/signup">
                        <span className='text-blue-600'>
                            user?
                        </span>
                    </Link>
                </h4>

                <form className='mt-10  w-screen'>
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

                    <div className='flex items-center justify-center mt-10'>
                        <button
                            type='submit'
                            className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-blue-600  text-white  font-bold text-lg'
                        >
                            Login
                        </button>
                    </div>

                </form>
                <h4 className='text-center text-gray-400 mt-5 font-semibold'>

                    Forgot Password?
                </h4>
            </div>
        </div>
    </>

    )
}

export default Login
