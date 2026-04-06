import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../pages/Chatbot";
import logo from "../assets/logo.png";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    const fullText = "Hi, Thanmaya";
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const announcements = [
        " Preference submission deadline: 10 Sept",
        " Roommate allotment: 15 Sept",
        " Contact admin if issues arise"
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % announcements.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [announcements.length]);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex(index + 1);
            }, 80);

            return () => clearTimeout(timeout);
        }
    }, [index]);



    return (
        <div className="flex min-h-screen text-black 
    bg-gradient-to-br from-blue-100 via-white to-green-100">

            {/* 🔮 Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white
        border-r border-blue-200 p-6 z-30
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        transition duration-300 md:translate-x-0`}
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-8">
                    Homigo
                </h2>

                <ul className="space-y-5 text-gray-700">
                    <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-blue-600">
                        Dashboard
                    </li>
                    <li onClick={() => navigate("/preferences")} className="cursor-pointer hover:text-blue-600">
                        Preferences
                    </li>
                    <li onClick={() => navigate("/match")} className="cursor-pointer hover:text-blue-600">
                        Match Result
                    </li>
                </ul>
            </div>

            {/* 🔷 Main Section */}
            <div className="flex-1 relative md:ml-64">

                {/* 🔝 Topbar */}
                <div className="flex items-center p-4 border-b border-blue-200 bg-white">

                    <button
                        onClick={() => setOpen(!open)}
                        className="text-2xl md:hidden"
                    >
                        ☰
                    </button>

                    {/* ✅ College Name + Logo */}
                    <div className="flex items-center gap-3 ml-4">
                        <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
                        <span className="font-semibold text-blue-700">
                            Dr B R Ambedkar National Institute of Technology Jalandhar
                        </span>
                    </div>

                    {/* Avatar */}
                    <div className="ml-auto flex items-center gap-3 relative">
                        <span className="text-sm text-gray-600">Student</span>

                        <div
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer"
                        >
                            S
                        </div>

                        {profileOpen && (
                            <div className="absolute right-0 top-12 z-50 w-40 bg-white
                              border border-blue-200 rounded-lg shadow p-2">

                                <div className="px-3 py-2 hover:bg-blue-100 cursor-pointer rounded">
                                    Profile
                                </div>

                                <div className="px-3 py-2 hover:bg-blue-100 cursor-pointer rounded">
                                    Settings
                                </div>

                                <div
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        setProfileOpen(false);
                                        navigate("/");
                                    }}
                                    className="px-3 py-2 text-red-500 hover:bg-red-100 cursor-pointer rounded"
                                >
                                    Logout
                                </div>

                            </div>
                        )}
                    </div>
                </div>

                {/* 📊 Content */}
                <div className="relative z-10 p-6">

                    {/* Typing Title */}
                    <h1 className="text-3xl font-bold text-blue-700 mb-6">
                        {text}
                        <span className="animate-pulse text-green-500">|</span>
                    </h1>

                    {/* ✅ Announcements */}
                    <div className="mb-6 p-5 rounded-2xl 
                bg-white/30 backdrop-blur-xl
                border border-white/40 shadow-md
                transition duration-500">

                        <h3 className="font-semibold text-blue-600 mb-3">
                            Announcements
                        </h3>

                        <div className="text-gray-700 text-sm h-6 overflow-hidden">
                            <div
                                key={current}
                                className="animate-slide"
                            >
                                {announcements[current]}
                            </div>
                        </div>

                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div
                            onClick={() => navigate("/preferences")}
                            className="cursor-pointer p-6 rounded-2xl
              bg-gradient-to-br from-blue-500 to-green-500
              text-white hover:scale-[1.03] transition duration-300">
                            <h2 className="text-xl font-semibold">
                                Fill Preferences
                            </h2>
                            <p className="text-sm mt-2">
                                Submit your lifestyle details
                            </p>
                        </div>

                        <div
                            onClick={() => navigate("/match")}
                            className="cursor-pointer p-6 rounded-2xl
              bg-gradient-to-br from-blue-500 to-green-500
              text-white hover:scale-[1.03] transition duration-300">

                            <h2 className="text-xl font-semibold">
                                View Match
                            </h2>
                            <p className="text-sm mt-2">
                                Check your assigned roommate
                            </p>
                        </div>

                    </div>
                </div>

                {/* 🤖 Floating Chatbot */}
                <Chatbot />

            </div>

        </div>
    );
}