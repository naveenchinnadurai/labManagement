import React, { useEffect, useState } from "react";
import ComplaintCard from "../components/complaintCard";
import apiClient from "../utils/api";
import { Complaint } from "../utils/types";
import { useUser } from "../context/userProvider";



const ViewComplaints: React.FC = () => {
    const { user } = useUser();
    const [complaints, setComplaints] = useState<Complaint[] | []>([]);
    useEffect(() => {
        const getComplaints = async () => {
            const res = await apiClient.get('/complaints');
            setComplaints(res.data.data)
            localStorage.setItem('all-complaints', JSON.stringify({ data: res.data.data }))
            console.log(res);
        }
        const complaintsInfo = localStorage.getItem('all-complaints')
        if (complaintsInfo) {
            setComplaints(JSON.parse(complaintsInfo || '{}').data);
        } else {
            getComplaints();
        }
    }, [])

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Student Complaints</h1>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3">
                {
                    complaints?.length > 0 ? (
                        complaints.map((complaint) => {
                            if (complaint.studentId === user?.id) {
                                return null;
                            }
                            return (
                                <ComplaintCard key={complaint.id} {...complaint} />
                            )
                        })
                    ) : (
                        <p className="text-gray-600">No complaints received yet.</p>
                    )
                }
            </div>
        </div>
    );
};



export default ViewComplaints;