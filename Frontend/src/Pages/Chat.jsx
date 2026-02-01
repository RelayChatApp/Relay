import React from "react";
import { Link } from 'react-router-dom'

const Chat = () => {
    const users = [
        { id: 1, name: "Muskan", img: "https://i.pinimg.com/originals/b2/ea/a0/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg" },
        { id: 2, name: "Renne", img: "https://wallpapers.com/images/hd/pfp-pictures-f2fh4fspnb6xtppy.jpg" },
        { id: 3, name: "Jessi", img: "https://i.pinimg.com/originals/35/66/f2/3566f254a759543a683278f8dd545cda.jpg" },
        { id: 4, name: "Sam", img: "https://wallpapers.com/images/hd/oscar-zahn-skeleton-headphones-unique-cool-pfp-rboah21ctf7m37o0.jpg" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-[30%] bg-amber-950">

                <div className="flex justify-between items-center mt-2">
                    <p className="font-extrabold text-5xl ml-5 fascinate-regular text-amber-100">
                        Relay
                    </p>

                    <Link to="/profile">
                        <img
                            src="https://images.pexels.com/photos/27665348/pexels-photo-27665348.jpeg?cs=srgb&dl=pexels-artosuraj-27665348.jpg&fm=jpg"
                            alt="profile"
                            className="rounded-[50%] h-10 w-10 mr-5"
                        />
                    </Link>
                </div>
                <div className="flex justify-center">
                    <input
                        type="search"
                        placeholder="Search here"
                        className="rounded-md bg-amber-50 w-[95%] p-1 mt-4 focus:border-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none"
                    />
                </div>


                {users.map((user) => (
                    <div
                        key={user.id}
                        className="hover:bg-amber-900 w-[90%] rounded-xl cursor-pointer mt-5 ml-3 h-20 p-1 flex items-center"
                    >
                        <div className="flex items-center gap-x-2">
                            <img
                                src={user.img}
                                alt="pfp"
                                className="w-15 h-15 rounded-[50%]"
                            />

                            <p className="text-amber-50 text-2xl font-bold">
                                {user.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat area */}
            <div className="min-h-screen w-[70%] bg-amber-100 flex flex-col">


                <div className=" flex items-center  gap-x-2 ml-10">
                    <img
                        src="https://wallpapers.com/images/hd/pfp-pictures-vbebp49893sh9qxl.jpg"
                        alt="pfp"
                        className="w-15 h-15 rounded-[50%]"
                    />

                    <p className="text-amber-950 text-4xl font-extrabold">Muskan</p>

                </div>


                <div className="mt-auto pb-6">
                    <div className="flex items-center justify-center gap-3">

                        <input
                            type="text"
                            placeholder="Type a message"
                            className="rounded-2xl border-2 border-amber-950 h-14 w-[70%] px-4 focus:ring-0 focus:outline-none"
                        />

                        <button className="rounded-full bg-amber-950 h-14 w-14 text-amber-100 flex items-center justify-center hover:bg-amber-900">
                            <span className="material-symbols-outlined scale-[1.5]">
                                send
                            </span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Chat;