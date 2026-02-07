import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [form, setForm] = useState({
        name: "",
        email: ""
    })
    function onChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    function submit(e) {
        e.preventDefault()
        console.log(form)

    }
    useEffect(() => {
        async function ProfileApi() {
            const api = await fetch("http://localhost:3000/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

            })
            const data = await api.json();

        }
        ProfileApi();
    }, [])

    return (
        <>
            <div className='flex justify-center items-center bg-amber-100 min-h-screen'>
                <div>
                    <div className='flex justify-center '>
                        <img
                            src="https://wallpapers.com/images/hd/pfp-pictures-f2fh4fspnb6xtppy.jpg"
                            alt="pfp"
                            className='w-40 h-40 rounded-[50%]'
                        />
                    </div>
                    <h1 className='mt-5 font-extrabold text-3xl text-center text-amber-950'>Jenny Vice</h1>

                    <form onSubmit={submit} className='w-screen'>
                        <div className='flex items-center justify-center mt-10'>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                placeholder='Name'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                        <div className='flex items-center justify-center mt-5'>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder='Email'
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                    </form >
                    <div className='flex items-end justify-center mt-5 '>
                        <button
                            type='submit'
                            className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950  text-white  font-bold text-lg'
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfilePage
