import React from 'react';
import { Navbar } from '../../components/student/navbar';
import { Outlet } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaBook, FaUniversity, FaPhone, FaExclamationTriangle, FaMoneyBillWave } from "react-icons/fa";
import { useUser } from '../../context/userProvider';

const HomeRoot: React.FC = () => {
    return (
        <div className="flex w-screen h-screen">
            <Navbar />
            <div className="overflow-auto w-full">
                <Outlet />
            </div>
        </div>
    );
};


export const Home = () => {
    const { user, logout } = useUser();
    const studentDetails = {
        name: user?.name,
        rollNo: user?.id,
        email: user?.email,
        department: user?.student.department,
        year: user?.student.year,
        mobileNumber: user?.mobileNumber,
        fines: [
            { amount: 300, reason: "Damaged lab equipment" },
            { amount: 150, reason: "Library late fee" },
        ],
        complaints: [
            { detail: "AC not working in the lab", status: "Pending" },
            { detail: "Broken chair in classroom", status: "Resolved" },
        ],
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl">
            <div className='bg-white rounded-lg shadow-lg p-10 '>
                <div className="gap-5 grid grid-cols-2 w-2/3">
                    <div className="flex items-center">
                        <FaUniversity className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Roll No: </strong> {studentDetails.rollNo}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <FaBook className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Department: </strong> {studentDetails.department}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <FaBook className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Year: </strong> {studentDetails.year}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <FaEnvelope className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Email: </strong> {studentDetails.email}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <FaPhone className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Mobile: </strong> {studentDetails.mobileNumber}
                        </p>
                    </div>

                    <button onClick={logout}>Signout</button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Fines */}
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                    <FaMoneyBillWave className="inline mr-2 text-green-600" /> Fines
                </h2>
                {studentDetails.fines.length > 0 ? (
                    studentDetails.fines.map((fine, index) => (
                        <div key={index} className="bg-red-100 p-4 mb-4 rounded-md shadow-sm">
                            <p>
                                <strong>Amount: </strong> ₹{fine.amount}
                            </p>
                            <p>
                                <strong>Reason: </strong> {fine.reason}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No fines available.</p>
                )}

                {/* Complaints */}
                <h2 className="text-xl font-bold mt-6 mb-4 text-gray-900">
                    <FaExclamationTriangle className="inline mr-2 text-yellow-600" /> Complaints
                </h2>
                {studentDetails.complaints.length > 0 ? (
                    studentDetails.complaints.map((complaint, index) => (
                        <div key={index} className="bg-yellow-100 p-4 mb-4 rounded-md shadow-sm">
                            <p>
                                <strong>Complaint: </strong> {complaint.detail}
                            </p>
                            <p>
                                <strong>Status: </strong> {complaint.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No complaints raised.</p>
                )}
            </div>
        </div>
    );
};

export default HomeRoot;
