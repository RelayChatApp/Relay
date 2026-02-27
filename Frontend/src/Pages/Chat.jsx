import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
    const navigate = useNavigate();
    const BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    /* ================= SOCKET INITIALIZATION ================= */

    const socket = useMemo(() => {
        return io(BASE_URL, {
            withCredentials: true,
        });
    }, [BASE_URL]);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("receive_message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    /* ================= FETCH USERS ================= */

    useEffect(() => {
        if (!currentUser) return;

        async function fetchUsers() {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/database`,
                    { credentials: "include" }
                );

                if (!res.ok) return;

                const data = await res.json();

                const filtered = data.filter(
                    user => user._id !== currentUser._id
                );

                setUsers(filtered);

            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }

        fetchUsers();
    }, [BASE_URL, currentUser]);

    /* ================= FETCH CURRENT USER ================= */

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/me`,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    navigate("/login");
                    return;
                }

                const data = await res.json();
                setCurrentUser(data.user);
            } catch {
                navigate("/login");
            }
        }

        fetchUser();
    }, [BASE_URL, navigate]);

    /* ================= JOIN ROOM + LOAD HISTORY ================= */

    useEffect(() => {
        if (!selectedUser || !currentUser || !socket) return;

        const roomId = [
            currentUser._id,
            selectedUser._id,
        ]
            .sort()
            .join("_");

        socket.emit("join_room", roomId);

        async function loadMessages() {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/messages/${roomId}`,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok) return;

                const data = await res.json();
                setMessages(data);
            } catch {
                console.error("Failed to load messages");
            }
        }

        loadMessages();
    }, [selectedUser, currentUser, socket, BASE_URL]);

    /* ================= SEND MESSAGE ================= */

    function handleSend() {
        if (!text.trim() || !selectedUser || !currentUser) return;

        const roomId = [
            currentUser._id,
            selectedUser._id,
        ]
            .sort()
            .join("_");

        const messageData = {
            room: roomId,
            text,
            sender: currentUser._id,
            receiver: selectedUser._id,
        };

        socket.emit("send_message", messageData);
        setText("");
    }

    /* ================= UI ================= */

    return (
        <div className="flex h-screen">
            {/* SIDEBAR */}
            <div
                className={`bg-amber-950 text-white w-full md:w-[30%] ${selectedUser
                    ? "hidden md:block"
                    : "block"
                    }`}
            >
                <div className="flex justify-between items-center p-4">
                    <p className="font-extrabold text-5xl text-amber-100 fascinate-regular">
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

                <div className="px-4 mb-2">
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
                        <p className="font-semibold">
                            {user.FName}
                        </p>
                    </div>
                ))}
            </div>

            {/* CHAT AREA */}
            <div
                className={`bg-amber-100 flex flex-col w-full md:w-[70%] ${!selectedUser
                    ? "hidden md:flex"
                    : "flex"
                    }`}
            >
                {selectedUser && currentUser && (
                    <>
                        {/* HEADER */}
                        <div className="flex items-center  gap-4 p-4 border-b border-amber-300">
                            <button
                                onClick={() =>
                                    setSelectedUser(null)
                                }
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

                        {/* MESSAGES */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-2">
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`p-2 rounded-lg max-w-[60%] ${msg.sender ===
                                        currentUser._id
                                        ? "bg-amber-950 text-white ml-auto"
                                        : "bg-white text-black"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* INPUT */}
                        <div className="p-4 border-t border-amber-300 flex gap-3">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) =>
                                    setText(e.target.value)
                                }
                                placeholder="Type a message"
                                className="flex-1 p-3 rounded-2xl border border-amber-950"
                            />

                            <button
                                className="bg-amber-950 text-white px-6 rounded-full"
                                onClick={handleSend}
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