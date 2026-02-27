import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    function onChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function submit(e) {
        e.preventDefault();
        setErr("");

        if (!form.email || !form.password) {
            setErr("All fields are required");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                setErr(data.message || "Invalid credentials");
                return;
            }

            setForm({ email: "", password: "" });
            navigate("/chat");

        } catch {
            setErr("Server error");
        }
    }

    return (
        <>
            <div className="flex justify-center bg-amber-100 min-h-screen">
                <div>
                    <h1 className="font-extrabold text-5xl mt-5 text-center fascinate-regular text-amber-950">
                        Relay
                    </h1>

                    <div className="flex justify-center mt-5">
                        <img
                            src="https://www.gloryofthesnow.com/wp-content/uploads/2022/08/Viber-Fall.png"
                            alt="Logo"
                            className="w-40 h-40 rounded-[50%]"
                        />
                    </div>

                    <h3 className="mt-5 font-bold text-3xl text-center text-amber-950">
                        Welcome Back!!
                    </h3>

                    <h4 className="mt-1 text-center text-gray-400">
                        Not a{" "}
                        <Link to="/signup">
                            <span className="text-blue-600">user?</span>
                        </Link>
                    </h4>

                    <form className="mt-6 w-screen" onSubmit={submit}>
                        <div className="flex items-center justify-center">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="Email"
                                className="p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold"
                            />
                        </div>

                        <br />

                        <div className="flex items-center justify-center">
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                placeholder="Password"
                                className="p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold"
                            />
                        </div>

                        <br />

                        <div className="flex items-center justify-center">
                            <p className="text-red-600 text-lg">{err}</p>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className='absolute bottom-5 p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950 text-white font-bold text-lg hover:text-amber-950 hover:bg-amber-50 cursor-pointer'
                            >
                                Login
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
