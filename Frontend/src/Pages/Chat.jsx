import React from "react";

const Chat = () => {
    const users = [
        { id: 1, name: "Muskan", icon: "account_circle" },
        { id: 2, name: "Renne", icon: "account_circle" },
        { id: 3, name: "Jessi", icon: "account_circle" },
        { id: 4, name: "Sam", icon: "account_circle" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="min-h-screen w-[30%] bg-amber-950">
                <p className="font-extrabold text-5xl mt-3 ml-4 fascinate-regular text-amber-100">
                    Relay
                </p>

                <input
                    type="search"
                    placeholder="Search here"
                    className="rounded-3xl bg-gray-200 h-10 w-[90%] p-2 ml-2 mt-4  focus:border-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none"
                />

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="hover:bg-amber-900 h-20 w-[90%] ml-2 mt-6 rounded-xl cursor-pointer"
                    >
                        <div className="flex space-x-6">
                            <span className="material-symbols-outlined scale-[3] pl-4 pt-4 text-amber-100">
                                {user.icon}
                            </span>
                            <p className="text-amber-100 pt-5 pl-6 text-xl">
                                {user.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat area */}
            <div className="min-h-screen w-[70%] bg-amber-100 flex flex-col">

                {/* Navbar */}
                <nav className="bg-amber-100 h-20 w-full shadow-2xl flex items-center justify-center space-x-6">
                    <span className="material-symbols-outlined scale-[2] pl-4 text-amber-950">
                        account_circle
                    </span>
                    <p className="text-amber-950 text-xl">Muskan</p>
                </nav>


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