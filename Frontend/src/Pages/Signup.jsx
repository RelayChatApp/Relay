import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [err, setErr] = useState("");
    const [form, setForm] = useState({
        FName: "",
        password: "",
        email: "",
    });

    function setFormValue(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function submit(e) {
        e.preventDefault();

        if (
            !form.FName.trim() ||
            !form.email.trim() ||
            !form.password.trim()
        ) {
            setErr("All fields are required");
            return;
        }

        if (!form.email.includes("@")) {
            setErr("Invalid Email");
            return;
        }

        if (form.password.length < 8) {
            setErr("Password too short");
            return;
        }

        if (
            !/[A-Z]/.test(form.password) ||
            !/[@#$%]/.test(form.password) ||
            !/[0-9]/.test(form.password)
        ) {
            setErr("Password not strong");
            return;
        }

        setErr("");
        setForm({
            FName: "",
            password: "",
            email: "",
        });

        // sending data to backend
        async function sendData() {
            try {
                const api = await fetch("http://localhost:3000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ Fname: form.FName, password: form.password, email: form.email })
                })

                if (!api.ok) {
                    setErr("Something went wrong")
                    return;
                }

                const data = await api.json();

            } catch (err) {
                setErr("Server Error");
            }
        }

        sendData();
    }

    return (
        <div className="bg-amber-100 flex justify-center items-center">
            <div className="min-h-screen">
                <h1 className="font-extrabold text-5xl mt-5 text-center text-amber-950 fascinate-regular">
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
                    Create Account!!
                </h3>

                <p className="mt-1 text-center text-gray-400">
                    Already a{" "}
                    <Link to="/">
                        <span className="text-blue-600">user?</span>
                    </Link>
                </p>

                <form onSubmit={submit} className="w-screen mt-6">
                    <div className="flex justify-center">
                        <input
                            type="text"
                            name="FName"
                            placeholder="Full Name"
                            value={form.FName}
                            onChange={setFormValue}
                            className="p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={setFormValue}
                            className="p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={setFormValue}
                            className="p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <p className="text-red-600 text-lg">{err}</p>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className='absolute bottom-15 p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-amber-950 text-white font-bold text-lg'
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
