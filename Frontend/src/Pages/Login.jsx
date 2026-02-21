import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function onChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function submit(e) {
        e.preventDefault();
        setErr("");

        async function loginApi() {
            try {
                const api = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password,
                    }),
                    credentials: "include",
                });

                const data = await api.json();
                if (api.status == 200) {
                    navigate("/chat")
                }

                if (!api.ok) {
                    setErr(data.message || "Something went wrong");
                    return;
                }

                setForm({
                    email: "",
                    password: "",
                });
            } catch (error) {
                setErr("Server error");
            }
        }

        loginApi();
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

                    <form className="mt-10 w-screen" onSubmit={submit}>
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
                                className="absolute bottom-15 p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950 text-white font-bold text-lg"
                            >
                                Login
                            </button>

                            <h4 className="text-center absolute bottom-7 text-gray-400 mt-5 font-semibold">
                                Forgot Password?
                            </h4>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
