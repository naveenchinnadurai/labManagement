import React, { useState } from "react";
import Modal from "../../components/modal";
import { HiPlusSm as Plus } from "react-icons/hi";

const RaiseComplaint: React.FC = () => {
    const [complaintData, setComplaintData] = useState({
        studentName: "",
        complaintDetail: "",
        postedDate: new Date().toISOString().split("T")[0],
        lab: "",
        status: "Pending"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComplaintData({ ...complaintData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(complaintData)
    };
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="p-6 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="w-full flex justify-end p-4" onClick={() => setOpen(true)}>
                <button className="p-2 px-5 bg-blue-500 rounded-lg text-white flex gap-1">
                    <Plus className="text-2xl" />
                    New Issue
                </button>
            </div>
            <div className="h-full flex justify-center py-5">
                <p className="text-lg font-normal">You have not raised any complaints!!</p>
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Raise a Complaint" className="">
                <form onSubmit={handleSubmit} className="w-full p-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="complaintDetail"> Complaint Details </label>
                        <textarea
                            id="complaintDetail"
                            name="complaintDetail"
                            value={complaintData.complaintDetail}
                            onChange={handleChange}
                            placeholder="Describe Your Issue"
                            required
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="lab"> Lab </label>
                        <input
                            type="text"
                            id="lab"
                            name="lab"
                            value={complaintData.lab}
                            placeholder="Lab No."
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="postedDate"> Date </label>
                        <input
                            type="date"
                            id="postedDate"
                            name="postedDate"
                            value={complaintData.postedDate}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
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
