import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [form, setForm] = useState({
        FName: "",
        password: "",
        confirmPassword: "",
        email: ""

    })
    const [err, setErr] = useState("")

    function setFormValue(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }
    function submit(e) {
        e.preventDefault()

        //Field constraints
        if (!form.FName.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
            setErr("All fields are required")
            return
        }

        if (!form.email.includes("@")) {
            setErr('Invalid Email')
            return

        }

        //Password constraints

        if (form.password.length < 8) {
            setErr("Password too short")
            return
        }
        if (!/[A-Z]/.test(form.password) || !/[@#$%]/.test(form.password) || !/[0-9]/.test(form.password)) {
            setErr("Password not strong")
            return
        }
        if (form.confirmPassword != form.password) {
            setErr("Passwords don't match")
            return
        }
        if (form.value == "") {
            setErr("All fields are required")

        }
        setErr("")
        setForm({
            FName: "",
            password: "",
            confirmPassword: "",
            email: ""

        })
    }




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

                    <form onSubmit={submit} className=' w-screen'>
                        <div className='flex items-center justify-center'>
                            <input
                                type="text"
                                name="FName"
                                placeholder='Full Name'
                                value={form.FName}
                                onChange={setFormValue}
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="text"
                                name="email"
                                placeholder='Email'
                                value={form.email}
                                onChange={setFormValue}
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold'
                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={form.password}
                                onChange={setFormValue}
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold '

                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm Password'
                                value={form.confirmPassword}
                                onChange={setFormValue}
                                className=' p-4 w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-white text-[8E9AAF] font-bold '

                            />
                        </div>
                        <br />
                        <div className='flex items-center justify-center'>
                            <p className='text-red-600 text-lg'>{err}</p>
                        </div>

                        <div className='flex items-center justify-center '>

                            <button

                                type='submit'
                                className='p-4  w-[90%] sm:w-100 rounded-[100px] shadow-2xl bg-blue-600  text-white  font-bold text-lg'
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
