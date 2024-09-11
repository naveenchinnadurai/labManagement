import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { HiPlusSm as Plus } from "react-icons/hi";
import RegisterAdmin from "../../components/admin/registerAdmin";
import { useUser } from "../../context/userProvider";
import apiClient from "../../utils/api";

interface Admin {
    id: string;
    name: string;
    email: string;
    mobileNumber?: string;
    adminRole: string;
}

const UserInfo: React.FC = () => {
    const { user } = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [admins, setAdmins] = useState<Admin[]>([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await apiClient.get("users/admins/");
                setAdmins(response.data.data);
            } catch (err) {
                console.log("Failed to fetch admins");
            }
        };

        fetchAdmins();
    }, []);

    return (
        <div className="p-4 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="w-full flex justify-between p-4" onClick={() => setOpen(true)}>
                <h1>{user?.name}</h1>
                <button className="p-2 px-5 bg-blue-500 rounded-lg text-white flex gap-1">
                    <Plus className="text-2xl" />
                    New Admin
                </button>
            </div>
            <div className="h-full flex justify-center py-5">
                {
                    admins.length === 0 ? (
                        <p className="text-lg font-normal">No Admin except you!!</p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold mb-4">Admin List</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    admins.map((admin) => (
                                        <div key={admin.id} className="bg-white shadow-md rounded-lg p-6">
                                            <h3 className="text-xl font-semibold mb-2">{admin.name}</h3>
                                            <p className="text-gray-700">
                                                <strong>Email:</strong> {admin.email}
                                            </p>
                                            {admin.mobileNumber && (
                                                <p className="text-gray-700">
                                                    <strong>Mobile:</strong> {admin.mobileNumber}
                                                </p>
                                            )}
                                            <p className="text-gray-700">
                                                <strong>Role:</strong> {admin.adminRole}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Create a Admin Role" className="">
                <RegisterAdmin />
            </Modal>
        </div>
    );
};

export default UserInfo;
