import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import apiClient from '../../utils/api';

interface SignupadminData {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    adminRole: string;
}

function RegisterAdmin() {
    const [adminData, setAdminData] = useState<SignupadminData>({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        adminRole: "Lab Assistant", // Set a default value for adminRole
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdminData({
            ...adminData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(adminData);
        try {
            const response = await apiClient.post("auth/signup", adminData);
            console.log(response.data);
        } catch (error) {
            console.error("Error creating admin:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl w-full max-w-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={adminData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={adminData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600">
                        {showPassword ? <IoMdEyeOff className="text-xl" /> : <IoMdEye className="text-xl" />}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={adminData.mobileNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="adminRole" className="block text-sm font-medium text-gray-700">Admin Role</label>
                <select
                    id="adminRole"
                    name="adminRole"
                    value={adminData.adminRole} // Use the value from the state
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="Lab Assistant">Lab Assistant</option>
                    <option value="HOD">HOD</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Create Admin
            </button>
        </form>
    );
}

export default RegisterAdmin;
