import React, { useEffect, useState } from 'react';
import { HiPlusSm as Plus } from 'react-icons/hi';
import { MdDeleteOutline as Delete } from 'react-icons/md';
import AddNewAdmin from '../../components/admin/addAdmin';
import apiClient from '../../utils/api';
import { useUser } from '../../context/userProvider';
import { fetchAdmins } from '../../utils/apiFuntions';
import { HiViewGridAdd as View } from "react-icons/hi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, UserPlus, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/button';

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
    const { setToast, user } = useUser();

    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = async () => {
        setAdmins(await fetchAdmins());
    };

    const deleteAdmin = async (id: string) => {
        try {
            const res = await apiClient.delete(`/admin/${id}`);
            if (res.status == 200) {
                setToast('Success', res.data.message);
                setAdmins((prev) => prev.filter((admin) => admin.id !== id));
            }
        } catch (error: any) {
            setToast('Error', error.response.data.error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen rounded-lg shadow-md space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="p-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex gap-2 items-center">
                            <Plus className="text-2xl" />
                            Add Admin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Add New Admin</DialogTitle>
                        </DialogHeader>
                        <AddNewAdmin onClose={(data) => { setOpen(false); setAdmins((prev) => [...prev, data]); }} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Infographics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Admins</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3 text-blue-600 text-2xl font-semibold">
                        <Users className="w-6 h-6" />
                        <span>{admins.length}</span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Super Admins</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3 text-green-600 text-2xl font-semibold">
                        <ShieldAlert className="w-6 h-6" />
                        <span>{admins.filter((a) => a.adminRole === 'super').length}</span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='relative'>
                        <CardTitle>Archived Admins</CardTitle>
                        <Button className='w-fit absolute top-2 right-3'>
                            <View className='text-2xl' />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3 text-yellow-600 text-2xl font-semibold">
                        <UserPlus className="w-6 h-6" />
                        <span>{admins.filter((a) => a.adminRole !== 'viewer').length}</span>
                    </CardContent>
                </Card>
            </div>

            {/* Admin List */}
            <h1 className="text-xl font-medium">Admins List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {admins.length === 0 ? (
                    <p className="text-lg font-medium">No Admin except you!</p>
                ) : (
                    admins.map((admin) => {
                        if (admin.id != user?.id) {
                            return (
                                <Card key={admin.id} className="relative group transition-all hover:shadow-xl border border-gray-200 rounded-2xl p-4 bg-white flex flex-col justify-between">
                                    <div className="flex items-center gap-4 mb-3">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                            {admin.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .slice(0, 2)
                                                .join('')
                                                .toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{admin.name}</h3>
                                            <p className="text-sm text-gray-500">{admin.adminRole}</p>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                                        {admin.mobileNumber && (
                                            <p>
                                                <strong>Mobile:</strong> {admin.mobileNumber}
                                            </p>
                                        )}
                                        <p>
                                            <strong>Email:</strong>{' '}
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${admin.adminRole === 'super'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-green-100 text-green-700'
                                                    }`}
                                            >
                                                {admin.email}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="absolute top-2 right-2">
                                        <AlertDialog>
                                            <AlertDialogTrigger className="bg-pink-100 hover:bg-pink-200 p-2 rounded-full">
                                                <Delete className="h-4 w-4 text-red-600" />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-base">
                                                        You're about to delete <strong>{admin.name}</strong> who is a <strong>{admin.adminRole}</strong>.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteAdmin(admin.id)}>
                                                        Ok
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </Card>
                            )
                        }
                    })
                )}
            </div>
        </div>
    );
};

export default Admins;
