import React, { useState } from "react";
import { useUser } from "../../context/userProvider";
import { Switch } from "@headlessui/react";
import {
    FiLogOut,
    FiAlertCircle,
    FiMoon,
    FiSun,
    FiUser,
    FiMail,
    FiSmartphone,
    FiKey,
    FiTrash,
    FiEdit,
} from "react-icons/fi";

const Settings: React.FC = () => {
    const { user, setUser, logout } = useUser();
    const [email, setEmail] = useState(user?.email || "");
    const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [darkMode, setDarkMode] = useState(false);

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

    const handleBugReport = () => {
        alert("Redirecting to bug report form...");
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            alert("Account deleted successfully");
        }
    };

    return (
        <div className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-2xl transition-all duration-500 ${darkMode ? "bg-[#1c1c1e] text-white" : "bg-white text-gray-900"} backdrop-blur-md`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-extrabold">Settings</h2>
                <Switch
                    checked={darkMode}
                    onChange={setDarkMode}
                    className={`${darkMode ? "bg-indigo-600" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-all`}
                >
                    <span className="sr-only">Enable Dark Mode</span>
                    <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full`}>
                        {darkMode ? <FiMoon className="text-black" /> : <FiSun className="text-yellow-500" />}
                    </span>
                </Switch>
            </div>

            {/* Profile Info */}
            <div className="mb-8 p-4 rounded-xl border shadow-sm flex flex-col gap-3 bg-gradient-to-br from-indigo-100/40 to-transparent dark:from-indigo-900/20">
                <div className="flex items-center gap-3">
                    <FiUser className="text-indigo-500 text-xl" />
                    <span className="text-lg font-semibold">{user?.name || "John Doe"}</span>
                </div>
                <div className="flex items-center gap-3">
                    <FiMail className="text-indigo-500 text-xl" />
                    <span>{email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <FiSmartphone className="text-indigo-500 text-xl" />
                    <span>{mobileNumber || "Not Provided"}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {/* Update Email */}
                <div className="mb-6">
                    <label className="block font-medium mb-2">Update Email</label>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl bg-transparent border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter new email"
                        />
                        <button onClick={handleEmailUpdate} className="px-4 py-2 w-fit text-md bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2">
                            <FiEdit className="text-sm" /> Update
                        </button>
                    </div>
                </div>

                {/* Update Mobile Number */}
                <div className="mb-6">
                    <label className="block font-medium mb-2">Update Mobile Number</label>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl bg-transparent border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter new number"
                        />
                        <button onClick={handleMobileUpdate} className=" px-4 py-2 w-fit bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2">
                            <FiEdit className="text-sm" /> Update
                        </button>
                    </div>

                </div>
            </div>

            {/* Change Password */}
            <div className="mb-6">
                <label className="block font-medium mb-2">Change Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl bg-transparent border-gray-300 mb-3"
                    placeholder="Current password"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl bg-transparent border-gray-300"
                    placeholder="New password"
                />
                <button onClick={handlePasswordChange} className="mt-3 px-4 py-2 w-full bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2">
                    <FiKey /> Change Password
                </button>
            </div>

            {/* Report a Bug */}
            <div className="mb-6">
                <button onClick={handleBugReport} className="w-full px-4 py-2 bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-600">
                    <FiAlertCircle /> Report a Bug
                </button>
            </div>

            {/* Delete Account */}
            <div className="mb-6">
                <button onClick={handleDeleteAccount} className="w-full px-4 py-2 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-red-700">
                    <FiTrash /> Delete Account
                </button>
            </div>

            {/* Logout */}
            <div className="mb-2">
                <button onClick={logout} className="w-full px-4 py-2 bg-gray-800 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900">
                    <FiLogOut /> Logout
                </button>
            </div>
        </div>
    );
};

export default Settings;
