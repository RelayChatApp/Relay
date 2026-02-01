import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='flex justify-center bg-amber-100 min-h-screen'>

                <div >

                    <h1 className='font-extrabold text-5xl mt-5 text-center fascinate-regular text-amber-950'>Relay</h1>

                    {/* Logo */}
                    <div className='flex justify-center mt-5'>
                        <img
                            src="https://www.gloryofthesnow.com/wp-content/uploads/2022/08/Viber-Fall.png"
                            alt="Logo"
                            className='w-40 h-40 rounded-[50%]'
                        />
                    </div>
                    <br />

                    <div className='flex justify-center items-center w-screen '>

                        <button
                            onClick={() => { navigate("/login") }}
                            className=' absolute bottom-5 p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950  text-white  font-bold text-lg'
                        >
                            Get Started
                        </button>

                    </div>
                </div>

            </div >
        </>
    )
}

export default Landing
