import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const users = [
        { id: 1, name: "Muskan", img: "https://i.pinimg.com/originals/b2/ea/a0/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg" },
        { id: 2, name: "Renne", img: "https://wallpapers.com/images/hd/pfp-pictures-f2fh4fspnb6xtppy.jpg" },
        { id: 3, name: "Jessi", img: "https://i.pinimg.com/originals/35/66/f2/3566f254a759543a683278f8dd545cda.jpg" },
        { id: 4, name: "Sam", img: "https://wallpapers.com/images/hd/oscar-zahn-skeleton-headphones-unique-cool-pfp-rboah21ctf7m37o0.jpg" },
    ];

    async function fetchUser() {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/me`, {
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
            setCurrentUser(data);
        } catch (error) {
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

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
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="p-4 hover:bg-amber-900 cursor-pointer flex items-center gap-3"
                    >
                        <img src={user.img} alt="" className="h-12 w-12 rounded-full" />
                        <p className="font-semibold">{user.name}</p>
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
                                src={selectedUser.img}
                                alt=""
                                className="h-12 w-12 rounded-full"
                            />

                            <p className="text-2xl font-bold text-amber-950">
                                {selectedUser.name}
                            </p>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto">
                            {/* Messages */}
                        </div>

                        <div className="p-4 border-t border-amber-300 flex gap-3">
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="flex-1 p-3 rounded-2xl border border-amber-950"
                            />
                            <button className="bg-amber-950 text-white px-6 rounded-full">
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