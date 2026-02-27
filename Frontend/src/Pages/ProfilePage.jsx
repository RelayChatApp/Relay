import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [err, setErr] = useState("");
    const [file, setFile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        FName: "",
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

    function handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    async function fetchUser() {
        try {
            const response = await fetch(`${BASE_URL}/api/me`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                navigate("/login");
                return;
            }

            const data = await response.json();
            setCurrentUser(data.user);

            setForm({
                FName: data.user.FName || "",
                email: data.user.email || ""
            });

            setLoading(false);

        } catch {
            navigate("/login");
        }
    }

    async function sendData() {
        try {
            const formData = new FormData();
            formData.append("FName", form.FName);
            formData.append("email", form.email);

            if (file) {
                formData.append("file", file);
            }

            const res = await fetch(`${BASE_URL}/api/profileUpdate`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (!res.ok) {
                setErr("Something Went Wrong");
                return;
            }
            const result = await res.json();

            setCurrentUser(result.user);

            setForm({
                FName: result.user.FName,
                email: result.user.email
            });
            setErr("");

        } catch {
            setErr("Something Went Wrong");
        }
    }

    async function handleLogout() {
        try {
            await fetch(`${BASE_URL}/api/logout`, {
                method: "POST",
                credentials: "include"
            });
        } finally {
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading || !currentUser) {
        return null;
    }

    return (
        <div className='flex justify-center bg-amber-100 min-h-screen'>
            <div>
                <div className="flex p-4 justify-between">
                    <Link to="/chat">
                        <p className='font-extrabold text-5xl text-center fascinate-regular text-amber-950'>
                            Relay
                        </p>
                    </Link>

                    <Link to="/profile">
                        <img
                            src={currentUser.profilePhoto}
                            alt="profile"
                            className="rounded-full h-10 w-10"
                        />
                    </Link>
                </div>

                <div className='flex justify-center items-center mt-10'>
                    <img
                        src={currentUser.profilePhoto}
                        alt="pfp"
                        className='w-40 h-40 rounded-full'
                    />
                </div>

                <h1 className='mt-5 font-extrabold text-3xl text-center text-amber-950'>
                    {currentUser?.FName}
                </h1>

                <form className='w-screen'>
                    <div className='flex items-center justify-center mt-5'>
                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className='p-4 w-[90%] sm:w-100 rounded-full shadow-2xl bg-white font-bold'
                        />
                    </div>

                    <div className='flex items-center justify-center mt-5'>
                        <input
                            type="text"
                            name="FName"
                            value={form.FName}
                            onChange={onChange}
                            placeholder='Name'
                            className='p-4 w-[90%] sm:w-100 rounded-full shadow-2xl bg-white font-bold'
                        />
                    </div>

                    <div className='flex items-center justify-center mt-5'>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder='Email'
                            className='p-4 w-[90%] sm:w-100 rounded-full shadow-2xl bg-white font-bold'
                        />
                    </div>
                </form>

                <div className="flex items-center justify-center">
                    <p className="text-red-600 text-lg">{err}</p>
                </div>

                <div className="flex justify-center">
                    <div className="flex gap-x-10 absolute bottom-15">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className='p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950 text-white font-bold text-lg hover:text-amber-950 hover:bg-amber-50 cursor-pointer'
                        >
                            Logout
                        </button>

                        <button
                            type='button'
                            onClick={sendData}
                            className='p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl hover:bg-amber-950 hover:text-white font-bold text-lg text-amber-950 bg-amber-50 '
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;