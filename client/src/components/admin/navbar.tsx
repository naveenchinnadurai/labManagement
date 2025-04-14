import { useState } from "react";
import { Link } from "react-router-dom";
import { GrAppsRounded as HomeIcon } from "react-icons/gr";
import { PiStudentBold as Students } from "react-icons/pi";
import { FaCalendarDays as Book, FaCopy as Complaints, FaUserTie as Staff } from "react-icons/fa6";
import { TbListDetails as Details } from "react-icons/tb";
import { IoMdSettings as Settings } from "react-icons/io";
import { CgScrollH as FaBars } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

import { useUser } from "../../context/userProvider";

const AdminNavbar = () => {
    const { user } = useUser();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`relative flex flex-col bg-white shadow-lg h-screen transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-1/2 -right-5 p-2 text-gray-600 hover:text-gray-900 transition-all duration-200"
            >
                <FaBars size={20} />
            </button>

            {/* Header Section */}
            <div className={`flex gap-2 items-center h-20 shadow-md px-3 ${isCollapsed && "justify-center"}`}>
                <FaUserCircle className="text-indigo-700 text-4xl" />
                {!isCollapsed && <h1 className="text-lg font-bold">{user?.name}</h1>}
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col justify-between h-full px-3">
                <ul className="flex flex-col py-4">
                    <li>
                        <Link to="/admin/dashboard" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <HomeIcon size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usersInfo" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Staff size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Admins</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/students" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Students size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Students</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reserveDashBoard" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Book size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Bookings</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/complaints" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Complaints size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Complaints</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/labItems" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Details size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Lab Items</span>}
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/admin/settings" className={`flex items-center h-12 px-3 text-gray-500 hover:text-gray-800 w-fit mx-auto ${!isCollapsed && "w-full hover:translate-x-2 transition-transform ease-in duration-200"}`}>
                            <Settings size={22} className="text-gray-500" />
                            {!isCollapsed && <span className="text-sm font-medium ml-3">Settings</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminNavbar;
