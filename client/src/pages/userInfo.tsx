import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import { HiPlusSm as Plus } from "react-icons/hi";
import RegisterAdmin from "../components/registerAdmin";
import axios from "axios";

const UserInfo: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [admins,setAdmins]=useState();
    const getAllAdmins = async () => {
        const res = await axios.get('http://localhost:7000/api/v1/users/admins/');

        console.log(res)
    }
    useEffect(() => {
        getAllAdmins()

    }, [])

    return (
        <div className="p-4 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="w-full flex justify-end p-4" onClick={() => setOpen(true)}>
                <button className="p-2 px-5 bg-blue-500 rounded-lg text-white flex gap-1">
                    <Plus className="text-2xl" />
                    New Admin
                </button>
            </div>
            <div className="h-full flex justify-center py-5">
                <p className="text-lg font-normal">No Admin except you!!</p>

            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Create a Admin Role" className="">
                <RegisterAdmin />
            </Modal>
        </div>
    );
};

export default UserInfo;
