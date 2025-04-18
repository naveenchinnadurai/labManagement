import React from 'react';
import { FaBook, FaEnvelope, FaExclamationTriangle, FaMoneyBillWave, FaPhone, FaUniversity } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/student/navbar';
import { useUser } from '../../context/userProvider';

const HomeRoot: React.FC = () => {
    return (
        <div className="flex w-screen h-screen bg-gray-50">
            <Navbar />
            <div className="overflow-auto w-full p-6">
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
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Student Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoRow icon={<FaUniversity />} label="Roll No" value={studentDetails.rollNo} />
                    <InfoRow icon={<FaBook />} label="Department" value={studentDetails.department} />
                    <InfoRow icon={<FaBook />} label="Year" value={studentDetails.year} />
                    <InfoRow icon={<FaEnvelope />} label="Email" value={studentDetails.email} />
                    <InfoRow icon={<FaPhone />} label="Mobile" value={studentDetails.mobileNumber} />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={logout}
                        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <FaMoneyBillWave className="mr-2 text-green-600" /> Fines
                </h2>
                {studentDetails.fines.length > 0 ? (
                    <div className="space-y-4">
                        {studentDetails.fines.map((fine, index) => (
                            <div key={index} className="bg-red-100 p-4 rounded-md shadow-sm border-l-4 border-red-500">
                                <p><strong>Amount: </strong> ₹{fine.amount}</p>
                                <p><strong>Reason: </strong> {fine.reason}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No fines available.</p>
                )}

                <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800 flex items-center">
                    <FaExclamationTriangle className="mr-2 text-yellow-600" /> Complaints
                </h2>
                {studentDetails.complaints.length > 0 ? (
                    <div className="space-y-4">
                        {studentDetails.complaints.map((complaint, index) => (
                            <div key={index} className="bg-yellow-100 p-4 rounded-md shadow-sm border-l-4 border-yellow-500">
                                <p><strong>Complaint: </strong> {complaint.detail}</p>
                                <p><strong>Status: </strong> {complaint.status}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No complaints raised.</p>
                )}
            </div>
        </div>
    );
};

const InfoRow = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
}) => (
    <div className="flex items-center space-x-3">
        <div className="text-indigo-500 text-xl">{icon}</div>
        <p className="text-gray-700">
            <strong>{label}: </strong> {value ?? 'N/A'}
        </p>
    </div>
);

export default HomeRoot;
