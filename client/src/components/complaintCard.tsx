import React, { useState } from 'react';
import {
    FaDotCircle as Dot,
    FaCalendar as Calendar,
    FaCalendarAlt as UpdatedCalendar
} from "react-icons/fa";
import { FaLocationDot as Location } from "react-icons/fa6";
import { FiEdit as Edit } from "react-icons/fi";
import { IoClose as Close, IoCheckmarkDoneSharp as Done } from "react-icons/io5";
import apiClient from '../utils/api';
import { useUser } from '../context/userProvider';
import { Complaint } from '../utils/types';

const ComplaintCard: React.FC<Complaint> = ({
    id,
    studentName,
    complaintDetails,
    createdAt,
    updatedAt,
    status,
    lab,
    studentId,
    message
}) => {
    const { user, setToast } = useUser();
    const [editMode, setEditMode] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<Complaint['status']>(status);
    const [replyMessage, setReplyMessage] = useState<string>(message || '');

    const getColor = (val: string) => {
        switch (val) {
            case "Resolved":
                return "text-green-500";
            case "Pending":
                return "text-red-500";
            default:
                return "text-yellow-500";
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
            const res = await apiClient.put(`/complaints/${id}`, {
                status: currentStatus,
                message: replyMessage
            });

            if (res.status) {
                setToast("Success", res.data.message);
            }
        } catch (error: any) {
            console.error(error);
            setToast("Error", error.response.data.error);

        }
        setEditMode(false);
    };

    const isStudent = user?.role === 'student';
    const isOwnComplaint = user?.id === studentId;

    return (
        <div className="p-6 bg-white border rounded-xl shadow-md space-y-4 transition hover:shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    {!isOwnComplaint && (
                        <h2 className="text-lg font-semibold text-gray-800">
                            Raised By: {studentName} ({studentId})
                        </h2>
                    )}
                    <p className="text-gray-600 mt-1">{complaintDetails}</p>
                </div>
                {!isStudent && (
                    editMode ? (
                        <div className="flex gap-2">
                            <button
                                onClick={saveStatus}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                <Done className="text-xl" />
                            </button>
                            <button
                                onClick={toggleEditMode}
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
                            >
                                <Close className="text-xl" /> Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditMode}
                            className="text-gray-600 hover:text-black"
                            title="Edit Status"
                        >
                            <Edit className="text-xl" />
                        </button>
                    )
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <Calendar className="text-base" />
                    <p>Posted On: {new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <UpdatedCalendar className="text-base" />
                    <p>Updated On: {new Date(updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Location className="text-base" />
                    <p>Lab: {lab}</p>
                </div>
                <div className="flex items-center gap-2">
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
                            <span className={`ml-2 font-medium ${getColor(currentStatus)}`}>{currentStatus}</span>
                        )}
                    </p>
                </div>
            </div>

            {editMode && !isStudent && (
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message to Student</label>
                    <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Optional message to explain status update..."
                        className="w-full border border-gray-300 rounded p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                    />
                </div>
            )}

            {!editMode && isStudent && (
                <div className="bg-blue-50 p-3 rounded text-sm border-l-4 border-blue-400">
                    <strong>Admin Message: </strong>{replyMessage || 'No Message From Admins'}
                </div>
            )}
        </div>
    );
};

export default ComplaintCard;
