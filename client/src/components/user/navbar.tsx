import { FaBook, FaExclamationCircle, FaHistory, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaCopy as Complaints } from "react-icons/fa6";


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };
    return (
        <nav className="bg-slate-800">
            <ul className="space-y-2 py-3 flex flex-col items-center justify-center text-white">
                <li>
                    <Link className="w-full flex items-center px-6 py-3" to='dashboard' >
                        <FaUserCircle className="text-3xl cursor-pointer" />
                    </Link>
                </li>
                <li>
                    <Link className="w-full flex items-center px-6 py-3" to='reserve' >
                        <FaBook className="text-xl" />
                    </Link>
                </li>
                <li>
                    <Link className="w-full flex items-center px-6 py-3" to='raise-complaint' >
                        <FaExclamationCircle className="text-xl" />
                    </Link>
                </li>
                <li className="mb-4">
                    <Link className="w-full flex items-center px-6 py-3" to='history' >
                        <Complaints className="text-xl" />
                    </Link>
                </li>
                <li>
                    <Link className="w-full flex items-center px-6 py-3" to='history' >
                        <FaHistory className="text-xl" />
                    </Link>
                </li>
                <li className='absolute bottom-2'>
                    <Link className="w-full flex items-center px-6 py-3" to='settings' >
                        <FaCog className="text-2xl" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar