import React, { useEffect, useState } from "react";
import { HiPlusSm as Plus } from "react-icons/hi";
import ComplaintCard from "../components/complaintCard";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useUser } from "../context/userProvider";
import apiClient from "../utils/api";
import { Complaint } from "../utils/types";
import { Card, CardContent } from "../components/ui/card";

const RaiseComplaint: React.FC = () => {
    const { user, setToast } = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [yourComplaintCount, setYourComplaintCount] = useState<number>(0);

    const [complaintData, setComplaintData] = useState({
        studentId: user?.id,
        studentName: user?.name,
        complaintDetails: "",
        lab: "",
    });
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        const getComplaints = async () => {
            try {
                const res = await apiClient.get(`/complaints/`);
                if (res.status) {
                    setToast("Success", res.data.message)
                    setComplaints(res.data.complaints);
                    setYourComplaintCount(res.data.complaints.filter((complaint: { studentId: string | undefined; }) => complaint.studentId == user?.id).length)
                }
            } catch (error: any) {
                setToast("Error", error.response.data.error || "Error During Fetchinf Complaints")
            }
        };

        getComplaints();

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setComplaintData({ ...complaintData, [name]: value });
    };

    const handleSelectChange = (value: string) => {
        setComplaintData({ ...complaintData, lab: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await apiClient.post("/complaints", complaintData);
            if (res.status === 201) {
                const newComplaint: Complaint = res.data.newComplaint;
                setComplaints((prev) => [...prev, newComplaint]);
                setToast("Success", res.data.message);
                setOpen(false);
            }
        } catch (error: any) {
            console.error(error);
            setToast("Error", error.response?.data?.error || "Encountered an error when raising a complaint!");
        }
    };

    return (
        <div className="p-4 bg-white min-h-screen rounded-lg shadow-sm flex flex-col">
            {
                user?.role == 'student' && (
                    <>
                        <div className="w-full flex justify-between p-2">
                            <h1 className="text-2xl font-semibold mb-4">Complaints Raised by You</h1>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
                                        <Plus className="text-lg" />
                                        New Issue
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-semibold">Raise New Complaint</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="complaintDetail">Complaint Details</Label>
                                            <Textarea
                                                id="complaintDetail"
                                                name="complaintDetails"
                                                value={complaintData.complaintDetails}
                                                onChange={handleChange}
                                                placeholder="Describe your issue..."
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lab">Lab</Label>
                                            <Select onValueChange={handleSelectChange} value={complaintData.lab}>
                                                <SelectTrigger id="lab">
                                                    <SelectValue placeholder="Select Lab" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="I">Lab I</SelectItem>
                                                    <SelectItem value="II">Lab II</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                                            Submit Complaint
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Card>
                            <CardContent className="py-5">
                                <div className="grid sm:grid-cols-2 2l:grid-cols-3 gap-4 mb-5">
                                    {yourComplaintCount > 0 ? (
                                        complaints.map((e) => {
                                            if (e.studentId == user.id) {
                                                return (
                                                    <ComplaintCard key={e.id} {...e} />
                                                )
                                            }
                                        })
                                    ) : (
                                        <p className="text-md font-normal text-zinc-500">You have not raised any complaints.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )
            }
            <h1 className="text-2xl font-bold mb-4 bg-white rounded-xl shadow-md p-5">Students Complaints</h1>
            <Card>
                <CardContent className="py-5">
                    <div className="grid sm:grid-cols-2 23 gap-3">
                        {
                            ((complaints?.length) - yourComplaintCount) > 0 ? (
                                complaints.map((complaint) => {
                                    if (complaint.studentId != user?.id) {
                                        return (
                                            <ComplaintCard key={complaint.id} {...complaint} />
                                        )
                                    }
                                })
                            ) : (
                                <p className="text-gray-600">No complaints received yet.</p>
                            )
                        }
                    </div>
                </CardContent>
            </Card>
        </div >
    );
};

export default RaiseComplaint;
