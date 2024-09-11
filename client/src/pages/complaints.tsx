import React, { useEffect, useState } from "react";
import ComplaintCard from "../components/complaintCard";

interface Complaint {
    id: string;
    studentName: string;
    rollNo: string;
    complaintDetail: string;
    postedDate: string;
    updatedDate: String;
    status: 'Resolved' | 'Pending' | 'In Progress';
    lab: string;
}

const ViewComplaints: React.FC = () => {
    const complaints: Complaint[] = [
        {
            id: "1",
            studentName: "John Doe",
            rollNo: "21UCS041",
            complaintDetail: "The lab computers are too slow, making it difficult to complete assignments on time.",
            postedDate: "2024-08-15",
            updatedDate: "2024-08-15",
            status: "Pending",
            lab: "III"
        },
        {
            id: "2",
            studentName: "Jane Smith",
            rollNo: "21UCS042",
            complaintDetail: "There are not enough working power outlets in the lab for students to charge their laptops.",
            postedDate: "2024-08-18",
            updatedDate: "2024-08-15",
            status: "Resolved",
            lab: "I"
        },
        {
            id: "3",
            studentName: "Michael Johnson",
            rollNo: "21UCS043",
            complaintDetail: "The internet connection in the lab is unstable, often disconnecting during important sessions.",
            postedDate: "2024-08-20",
            updatedDate: "2024-08-15",
            status: "In Progress",
            lab: "II"
        },
        {
            id: "4",
            studentName: "Emily Davis",
            rollNo: "21UCS044",
            complaintDetail: "The lab is often overcrowded, especially during peak hours, making it difficult to find a seat.",
            postedDate: "2024-08-22",
            updatedDate: "2024-08-15",
            status: "Pending",
            lab: "II"
        },
        {
            id: "5",
            studentName: "David Wilson",
            rollNo: "21UCS045",
            complaintDetail: "The lab's air conditioning system is not functioning properly, making the environment uncomfortable.",
            postedDate: "2024-08-25",
            updatedDate: "2024-08-15",
            status: "Resolved",
            lab: "III"
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Student Complaints</h1>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3">
                {
                    complaints.length > 0 ? (
                        complaints.map((complaint) => (
                            <ComplaintCard key={complaint.id} {...complaint} />
                        ))
                    ) : (
                        <p className="text-gray-600">No complaints received yet.</p>
                    )
                }
            </div>
        </div>
    );
};



export default ViewComplaints;