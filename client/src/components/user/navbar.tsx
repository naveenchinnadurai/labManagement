import { FaBook, FaExclamationCircle, FaHistory, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaCopy as Complaints } from "react-icons/fa6";


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };
    return (
        <nav className="bg-slate-800">
            <ul className="space-y-2 py-3 flex flex-col items-center justify-center">
                <li>
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/user/home')}
                    >
                        <FaUserCircle className="text-3xl cursor-pointer" />
                    </button>
                </li>
                <li>
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/user/reserve')}
                    >
                        <FaBook className="text-xl" />
                    </button>
                </li>
                <li>
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/user/raise-complaint')}
                    >
                        <FaExclamationCircle className="text-xl" />
                    </button>
                </li>
                <li className="mb-4">
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/history')}
                    >
                        <Complaints className="text-xl" />
                    </button>
                </li>
                <li>
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/history')}
                    >
                        <FaHistory className="text-xl" />
                    </button>
                </li>
                <li className='absolute bottom-2'>
                    <button
                        className="w-full flex items-center px-6 py-3"
                        onClick={() => navigate('/settings')}
                    >
                        <FaCog className="text-2xl" />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar