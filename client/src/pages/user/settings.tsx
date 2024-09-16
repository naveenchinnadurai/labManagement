import React, { useState } from "react";
import { useUser } from "../../context/userProvider";

const Settings: React.FC = () => {
    const { user, setUser, logout } = useUser();

    const [email, setEmail] = useState(user?.email || "");
    const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleEmailUpdate = () => {
        setUser(prev => prev ? { ...prev, email } : null);
        alert("Email updated successfully");
    };

    const handleMobileUpdate = () => {
        setUser(prev => prev ? { ...prev, mobileNumber } : null);
        alert("Mobile number updated successfully");
    };

    const handlePasswordChange = () => {
        alert("Password changed successfully");
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Account Settings</h2>

            {/* Update Email Section */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Update Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter new email address"
                />
                <button
                    onClick={handleEmailUpdate}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Update Email
                </button>
            </div>

            {/* Update Mobile Number Section */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Update Mobile Number</label>
                <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter new mobile number"
                />
                <button
                    onClick={handleMobileUpdate}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Update Mobile Number
                </button>
            </div>

            {/* Change Password Section */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Change Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Current password"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-3 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="New password"
                />
                <button
                    onClick={handlePasswordChange}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Change Password
                </button>
            </div>

            {/* Logout Button */}
            <div className="mb-6">
                <button
                    onClick={logout}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Settings;
