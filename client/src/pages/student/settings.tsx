import React, { useState } from "react";
import { useUser } from "../../context/userProvider";
import { Switch } from "@headlessui/react";
import { FiLogOut, FiAlertCircle, FiMoon, FiSun } from "react-icons/fi";

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
        <div className={`max-w-4xl mx-auto p-8 shadow-lg rounded-lg transition ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h2 className="text-3xl font-bold mb-6 text-center">Account Settings</h2>

            {/* Update Email */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Update Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Enter new email" />
                <button onClick={handleEmailUpdate} className="mt-3 px-4 py-2 w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Update Email</button>
            </div>

            {/* Update Mobile Number */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Update Mobile Number</label>
                <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Enter new number" />
                <button onClick={handleMobileUpdate} className="mt-3 px-4 py-2 w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Update Mobile</button>
            </div>

            {/* Change Password */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Change Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Current password" />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-3 w-full px-4 py-2 border rounded-lg" placeholder="New password" />
                <button onClick={handlePasswordChange} className="mt-3 px-4 py-2 w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Change Password</button>
            </div>

            {/* Theme Toggle */}
            <div className="mb-6 flex items-center justify-between p-4 border rounded-lg">
                <span className="font-semibold">Dark Mode</span>
                <Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? "bg-indigo-600" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-all`}>
                    <span className="sr-only">Enable Dark Mode</span>
                    <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-all`}>
                        {darkMode ? <FiMoon className="text-gray-900" /> : <FiSun className="text-yellow-500" />}
                    </span>
                </Switch>
            </div>

            {/* Report a Bug */}
            <div className="mb-6">
                <button onClick={handleBugReport} className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600">
                    <FiAlertCircle /> Report a Bug
                </button>
            </div>

            {/* Delete Account */}
            <div className="mb-6">
                <button onClick={handleDeleteAccount} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Account</button>
            </div>

            {/* Logout Button */}
            <div className="mb-6">
                <button onClick={logout} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900">
                    <FiLogOut /> Logout
                </button>
            </div>
        </div>
    );
};

export default Settings;
