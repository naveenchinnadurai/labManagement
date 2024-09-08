import React from "react";
import { FaCalendarDays as Book, FaCopy as Complaints } from "react-icons/fa6";
import { GrAppsRounded as HomeIcon } from "react-icons/gr";
import { IoMdSettings as Settings } from "react-icons/io";
import { PiStudentBold as Students } from "react-icons/pi";
import { TbListDetails as Details } from "react-icons/tb";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <aside className="w-fit bg-gray-800 text-white flex flex-col p-1 py-3">
            <nav className="flex-1 flex flex-col justify-between">
                <ul>
                    <li className="mb-4">
                        <Link to="reserveDashBoard" className="block py-2 px-4 rounded hover:bg-gray-700k" >
                            <HomeIcon className="text-2xl" />
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="usersInfo" className="block py-2 px-4 rounded hover:bg-gray-700">
                            <Students className="text-2xl" />
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link  to="reserve" className="block py-2 px-4 rounded hover:bg-gray-700" >
                            <Book className="text-2xl" />
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="complaints" className="block py-2 px-4 rounded hover:bg-gray-700" >
                            <Complaints className="text-2xl" />
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="labItems" className="block py-2 px-4 rounded hover:bg-gray-700" >
                            <Details className="text-2xl" />
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li className="mb-4">
                        <Link to="/admin/settings" className="block py-2 px-4 rounded hover:bg-gray-700" >
                            <Settings className="text-2xl" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
export default Navbar;
