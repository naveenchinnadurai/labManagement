import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard as Home } from "react-icons/md";
import { AiOutlineProfile as Complaints } from "react-icons/ai";
import { CiWarning as RaiseComplaints } from "react-icons/ci";
import { CiCalendarDate as Calendar } from "react-icons/ci";
import { CgScrollH as FaBars} from "react-icons/cg";


import { IoSettingsOutline as Settings, IoLogOutOutline as Logout } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`relative flex flex-col bg-white shadow-lg h-screen transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
            {/* Header Section */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-1/2 -right-5 p-2 text-gray-600 hover:text-gray-900 transition-all duration-200"
            >
                <FaBars size={20} />
            </button>
            <div className={`flex gap-2 items-center h-20 shadow-md px-3 ${isCollapsed && "justify-center"}`}>
                <FaUserCircle className="text-indigo-700 text-4xl" />
                {!isCollapsed && <h1 className="text-lg font-bold">Naveen</h1>}
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col justify-between h-full px-3">
                <ul className="flex flex-col py-4">
                    <li>
                        <Link
                            to="/student/dashboard"
                            className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}`}
                        >
                            <Home size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/student/raise-complaint"
                            className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 transition-transform duration-200 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}`}
                        >
                            <RaiseComplaints size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Raise Issue</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/student/complaints"
                            className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 transition-transform duration-200 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}`}
                        >
                            <Complaints size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Complaints</span>}
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link
                            to="/student/settings"
                            className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 transition-transform duration-200 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}`}
                        >
                            <Settings size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Settings</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 transition-transform duration-200 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}`}
                        >
                            <Logout size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Logout</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
