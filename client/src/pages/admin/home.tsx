import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/admin/navbar";
import { useUser } from "../../context/userProvider";

export const Home: React.FC = () => {
    const { user, logout } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    
    return (
        <div className="flex-1 bg-gray-100 p-6 h-full">
            <header className="relative flex justify-end items-center bg-white p-4 shadow-md">
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 text-xl font-medium">{user?.name}</span>
                    <FaUserCircle
                        className="text-gray-700 text-3xl cursor-pointer"
                        onClick={toggleDropdown}
                    />
                </div>
                {
                    isDropdownOpen && (
                        <div className="absolute top-14 right-0 shadow-lg rounded-md py-2 w-40 z-50 bg-white">
                            <button
                                onClick={logout}
                                className="block w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 text-lg"
                            >
                                Sign Out
                            </button>
                        </div>
                    )
                }
            </header>

            <main className="mt-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
                <p className="text-gray-700 mt-4">Select an option from the left to get started.</p>
            </main>
        </div>
    );
};

function HomeLayout() {
    return (
        <div className="flex w-screen h-screen">
            <Navbar />
            <div className="overflow-auto w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default HomeLayout;
