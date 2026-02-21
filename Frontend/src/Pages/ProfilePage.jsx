import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: ""
    });

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    function onChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function fetchProfile() {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                navigate("/login");
                return;
            }

            const data = await response.json();

            setForm({
                name: data.name || "",
                email: data.email || ""
            });

        } catch {
            navigate("/login");
        }
    }

    async function handleLogout() {
        try {
            await fetch(`${BASE_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });

            navigate("/login");

        } catch {
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <div className='flex justify-center  bg-amber-100 min-h-screen'>
                <div>
                    <div className="flex p-4 justify-between">
                        <Link to="/chat">
                            <p className='font-extrabold text-5xl text-center fascinate-regular text-amber-950'>Relay</p>
                        </Link>

                        <Link to="/profile">
                            <img
                                src="https://images.pexels.com/photos/27665348/pexels-photo-27665348.jpeg"
                                alt="profile"
                                className="rounded-full h-10 w-10"
                            />
                        </Link>
                    </div>


                    <div className='flex justify-center items-center mt-10'>
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
                            onClick={handleLogout}
                            type='button'
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
