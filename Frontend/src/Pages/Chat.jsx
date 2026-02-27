import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function ActiveUsers() {
            try {
                const api = await fetch(`${BASE_URL}/api/database`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!api.ok) return;

                const data = await api.json();
                setUsers(data);

            } catch (error) {
                console.error("Failed to fetch users");
            }
        }

        ActiveUsers();
    }, [BASE_URL]);


    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${BASE_URL}/api/me`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                setCurrentUser(data.user);

            } catch (error) {
                navigate("/login");
            }
        }

        fetchUser();
    }, [BASE_URL, navigate]);


    const socket = useMemo(() => {
        return io(BASE_URL, {
            withCredentials: true
        });
    }, [BASE_URL]);

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
            socket.emit("welcome", "hello muskan don");
        });

        return () => {
            socket.off("connect");
            socket.disconnect();
        };

    }, [socket]);

    return (
        <div className="flex h-screen">

            {/* SIDEBAR */}
            <div className={`bg-amber-950 text-white w-full md:w-[30%] ${selectedUser ? "hidden md:block" : "block"}`}>
                <div className="flex justify-between items-center p-4">
                    <p className="font-extrabold text-5xl text-center fascinate-regular text-amber-100">
                        Relay
                    </p>

                    {currentUser && (
                        <Link to="/profile">
                            <img
                                src={currentUser.profilePhoto}
                                alt="profile"
                                className="rounded-full h-10 w-10"
                            />
                        </Link>
                    )}
                </div>

                <div className="px-4">
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full p-2 bg-amber-50 text-black"
                    />
                </div>


                {users.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className="p-4 hover:bg-amber-900 cursor-pointer flex items-center gap-3"
                    >
                        <img
                            src={user.profilePhoto}
                            alt=""
                            className="h-12 w-12 rounded-full"
                        />
                        <p className="font-semibold">{user.FName}</p>
                    </div>
                ))}
            </div>

            {/* CHAT AREA */}
            <div
                className={`
                    bg-amber-100 flex flex-col
                    w-full md:w-[70%]
                    ${!selectedUser ? "hidden md:flex" : "flex"}
                `}
            >
                {selectedUser && (
                    <>
                        <div className="flex items-center gap-4 p-4 border-b border-amber-300">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="md:hidden text-xl"
                            >
                                ←
                            </button>

                            <img
                                src={selectedUser.profilePhoto}
                                alt=""
                                className="h-12 w-12 rounded-full"
                            />

                            <p className="text-2xl font-bold text-amber-950">
                                {selectedUser.FName}
                            </p>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            {/* Messages will go here */}
                        </div>

                        <div className="p-4 border-t border-amber-300 flex gap-3">
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="flex-1 p-3 rounded-2xl border border-amber-950"
                            />
                            <button
                                className="bg-amber-950 text-white px-6 rounded-full"
                                onClick={() => {
                                    socket.emit("send_message", {
                                        text: "Hello",
                                        to: selectedUser?._id
                                    });
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;