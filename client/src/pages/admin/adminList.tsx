import React, { useEffect, useState } from "react";
import { HiPlusSm as Plus } from "react-icons/hi";
import { MdDeleteOutline as Delete } from "react-icons/md";
import AddNewAdmin from "../../components/admin/addAdmin";
import apiClient from "../../utils/api";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "../../components/ui/alert-dialog"

import { useUser } from "../../context/userProvider";
import { fetchAdmins } from "../../utils/apiFuntions";

export interface Admin {
    id: string;
    name: string;
    email: string;
    mobileNumber?: string;
    adminRole: string;
}

const Admins: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [open, setOpen] = useState(false);
    const { setToast } = useUser();

    useEffect(() => { getAdmins() }, []);

    const getAdmins = async () => {
        setAdmins(await fetchAdmins())
    };

    const deleteAdmin = async (id: string) => {
        try {
            const res = await apiClient.delete(`users/admin/${id}`);
            console.log(res);
            if (res.status == 200) {
                setToast("Success", res.data.message)
                setAdmins(prev => prev.filter(admin => admin.id !== id));
            }
        } catch (error: any) {
            setToast("Error", error.response.data.error)
        }

    }

    return (
        <div className="p-4 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="w-full flex justify-between items-center  p-4" >
                <h1 className="text-2xl font-bold">Admin Lists</h1>
                {/* <button onClick={()=>{
                    toast(
                        "Hellow",{
                            description:"its working"
                        }
                    )
                }}>
                    toast
                </button> */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button className="p-1.5 px-3 bg-blue-500 rounded-lg text-white flex gap-1">
                            <Plus className="text-2xl" />
                            Add Admin
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-100">
                        <DialogHeader>
                            <DialogTitle>Add New Admin</DialogTitle>
                        </DialogHeader>
                        <AddNewAdmin onClose={(data) => { setOpen(false); setAdmins(prev => [...prev, data]) }} />
                    </DialogContent>
                </Dialog>

            </div>
            <div className="h-full flex justify-center p-3 ">
                {
                    admins.length === 0 ? (
                        <p className="text-lg font-normal">No Admin except you!!</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {
                                admins.map((admin) => (
                                    <div key={admin.id} className="bg-white shadow-md rounded-lg p-6 h-fit flex flex-col gap-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-xl font-semibold mb-2">{admin.name}</h3>
                                            <AlertDialog>
                                                <AlertDialogTrigger className="bg-pink-100 h-fit p-2 rounded-full">
                                                    <Delete className="h-5 w-5 text-red-600" />
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-[15.6px]">
                                                            You are about to delete this admin, <strong>{admin.name}</strong> who is <strong>{admin.adminRole}</strong>,
                                                            Click <strong>Ok</strong> to confirm and <strong>Cancel</strong> to abort.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteAdmin(admin.id)}>Ok</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
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
                    )
                }

            </div>

        </div>
    );
};

export default Admins;
