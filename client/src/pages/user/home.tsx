import React from 'react';
import Navbar from '../../components/user/navbar';
import { Outlet } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaBook, FaUniversity, FaPhone, FaExclamationTriangle, FaMoneyBillWave } from "react-icons/fa";

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
    const studentDetails = {
        name: "Swetha Kumar",
        rollNo: "2022B001",
        email: "swethakumar@example.com",
        department: "Electrical Engineering",
        year: "2nd",
        mobileNumber: "9876543210",
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
            {/* Left Section: Student Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-6">
                    <FaUserCircle className="text-indigo-700 text-7xl" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">Welcome, {studentDetails.name}!</h2>

                <div className="space-y-4 grid grid-cols-5 place-items-center">
                    <div className="flex items-center justify-center">
                        <FaUniversity className="mr-3 text-indigo-500" />
                        <p className="text-gray-700">
                            <strong>Roll No: </strong> {studentDetails.rollNo}
                        </p>
                    </div>

                    <div className="flex ">
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
                </div>
            </div>

            {/* Right Section: Fines and Complaints */}
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
