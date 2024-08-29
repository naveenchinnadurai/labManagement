import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export const Home: React.FC = () => {
    return (
        <div className="flex-1 h-screen">
            <div className="flex-1 bg-gray-100 p-6">
                <header className="flex justify-end items-center bg-white p-4 shadow-md">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Admin</span>
                        <FaUserCircle className="text-gray-700 text-3xl cursor-pointer" />
                    </div>
                </header>

                <main className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
                    <p className="text-gray-700 mt-4">Select an option from the left to get started.</p>
                </main>
            </div>
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
