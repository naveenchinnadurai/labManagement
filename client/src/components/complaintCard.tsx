import React, { useState } from 'react';
import { FaDotCircle as Dot, FaCalendar as Calender, FaCalendarAlt as UpdatedCalender } from "react-icons/fa";
import { FaLocationDot as Location } from "react-icons/fa6";
import { FiEdit as Edit } from "react-icons/fi";
import { IoClose as Close, IoCheckmarkDoneSharp as Done } from "react-icons/io5";
import { } from "react-icons/io5";
import apiClient from '../utils/api';
import { useUser } from '../context/userProvider';
import { Complaint } from '../utils/types';



const ComplaintCard: React.FC<Complaint> = ({ id, studentName, complaintDetails, createdAt, updatedAt, status, lab, studentId }) => {
    const { user } = useUser();
    const [editMode, setEditMode] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<Complaint['status']>(status);

    const getColor = (val: string) => {
        if (val === "Resolved") {
            return "text-green-400";
        } else if (val === "Pending") {
            return "text-red-400";
        } else {
            return "text-yellow-400";
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value as Complaint['status']);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const saveStatus = async () => {
        try {
            const res = await apiClient.put(`/complaints/${id}`, { status: currentStatus })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setEditMode(false);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Raised By: {user?.name === studentName ? "You" : studentName} ({studentId})</h2>
                {
                    user?.role != 'student' ? (
                        editMode ? (
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={saveStatus}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    <Done className='text-xl' />
                                </button>
                                <button
                                    onClick={toggleEditMode}
                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center justify-center"
                                >
                                    <Close className='text-xl' />cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-end">
                                <button
                                    onClick={toggleEditMode}
                                    className="px-3 py-1 rounded text-black"
                                >
                                    <Edit className='text-xl' />
                                </button>
                            </div>
                        )
                    ) : null
                }
            </div>
            <p className="text-gray-600 mt-2">{complaintDetails}</p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                <div className="flex gap-1 items-center justify-center">
                    <Calender className="text-base" />
                    <p>Posted On: {new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <Dot className={`text-base ${getColor(currentStatus)}`} />
                    <p>Status:
                        {editMode ? (
                            <select
                                value={currentStatus}
                                onChange={handleStatusChange}
                                className="ml-2 border border-gray-300 rounded p-1 text-gray-700"
                            >
                                <option value="Resolved">Resolved</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                        ) : (
                            <span className={`ml-2 ${getColor(currentStatus)}`}>{currentStatus}</span>
                        )}
                    </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <Location className="text-base" />
                    <p>Lab: {lab}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <UpdatedCalender className="text-base" />
                    <p>Updated On: {new Date(updatedAt).toLocaleDateString()}</p>
                </div>
            </div>

        </div>
    );
};

export default ComplaintCard;
