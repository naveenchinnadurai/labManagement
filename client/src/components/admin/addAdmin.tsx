import React, { useState } from 'react';
import { useUser } from '../../context/userProvider';
import apiClient from '../../utils/api';
import { Admin } from '../../pages/admin/adminList';

interface SignupadminData {
    name: string;
    email: string;
    mobileNumber: string;
    adminRole: string;
}

function AddNewAdmin({ onClose }: { onClose: (data: Admin) => void }) {
    const { setToast } = useUser();
    const [adminData, setAdminData] = useState<SignupadminData>({
        name: "",
        email: "",
        mobileNumber: "",
        adminRole: "Lab Assistant", // Set a default value for adminRole
    });


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
            console.log(response);
            if (response.status == 201) {
                setToast("Success", response.data.message);
                onClose(response.data.newAdmin);
            }
        } catch (error) {
            console.error("Error creating admin:", error);
        }
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
                    placeholder='- - - - - - - -'
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
                    placeholder='- - - - - - - -'
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={adminData.mobileNumber}
                    onChange={handleChange}
                    placeholder='- - - - - - - -'
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="adminRole" className="block text-sm font-medium text-gray-700">Admin Role</label>
                <select
                    id="adminRole"
                    name="adminRole"
                    value={adminData.adminRole}
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

export default AddNewAdmin;
