import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";
import { HiPlusSm as Plus } from "react-icons/hi";
import { useUser } from "../../context/userProvider";
import apiClient from "../../utils/api";
import { Complaint } from "../../utils/types";
import ComplaintCard from "../../components/complaintCard";

const RaiseComplaint: React.FC = () => {
    const { user } = useUser();
    const [open, setOpen] = useState<boolean>(false);

    const [complaintData, setComplaintData] = useState({
        studentId: user?.id,
        studentName: user?.name,
        complaintDetails: "",
        postedDate: new Date().toISOString().split("T")[0],
        lab: "",
        status: "Pending"
    });
    const [complaints, setComplaints] = useState<Complaint[] | []>([]);

    useEffect(() => {
        const getComplaints = async () => {
            const res = await apiClient.get(`/complaints/user/${user?.id}`);
            setComplaints(res.data.data)
            localStorage.setItem('my-complaints', JSON.stringify({ data: res.data.data }))
            console.log(res);
        }
        const myComplaints = localStorage.getItem('my-complaints')
        if (myComplaints) {
            setComplaints(JSON.parse(myComplaints || '{}').data);
        } else {
            getComplaints();
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setComplaintData({ ...complaintData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(complaintData)

        try {
            const res = await apiClient.post('/complaints', complaintData)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="p-6 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="w-full flex justify-end p-4" onClick={() => setOpen(true)}>
                <button className="p-2 px-5 bg-blue-500 rounded-lg text-white flex gap-1">
                    <Plus className="text-2xl" />
                    New Issue
                </button>
            </div>
            <h1 className="text-2xl font-medium">Complaints raised By You : </h1>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3 mt-5">
                {
                    complaints?.length > 0 ? (
                        complaints?.map((e) => {
                            return (
                                <ComplaintCard key={e.id} {...e} />
                            )
                        })
                    ) : (
                        <p className="text-lg font-normal">You have not raised any complaints!!</p>
                    )

                }
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Raise a Complaint" className="">
                <form onSubmit={handleSubmit} className="w-full p-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="complaintDetail"> Complaint Details </label>
                        <textarea
                            id="complaintDetail"
                            name="complaintDetails"
                            value={complaintData.complaintDetails}
                            onChange={handleChange}
                            placeholder="Describe Your Issue"
                            required
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="lab"> Lab </label>
                        <select
                            id="lab"
                            name="lab"
                            value={complaintData.lab}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select Lab</option>
                            <option value="I">Lab I</option>
                            <option value="II">Lab II</option>
                        </select>
                    </div>



                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Submit Complaint
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default RaiseComplaint;
