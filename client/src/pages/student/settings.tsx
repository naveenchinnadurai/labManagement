import React, { useState } from "react";
import { FiAlertCircle, FiEdit, FiKey, FiMail, FiSmartphone, FiUser } from "react-icons/fi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useUser } from "../../context/userProvider";
import { faqs } from "../../utils/data";
import API from "../../utils/api";
import { FiEye as EyeOpen, FiEyeOff as EyeClose } from "react-icons/fi";


const Settings: React.FC = () => {
    const { user, setUser, setToast } = useUser();
    const [email, setEmail] = useState(user?.email || "");
    const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);


    const handleEmailUpdate = async () => {
        try {
            const res = await API.put('/student/email', { email })
            console.log(res);
            if (res.status) {
                setToast("Success", res.data.message);
                setUser(prev => (prev ? { ...prev, email } : null));
            }

        } catch (error: any) {
            setToast("Error", error.response.data.error || "Error When updating Email!!");
        }
    };

    const handleMobileUpdate = async () => {
        try {
            const res = await API.put('/student/mobile', { mobileNumber })
            console.log(res);
            if (res.status) {
                setToast("Success", res.data.message);
                setUser(prev => (prev ? { ...prev, mobileNumber } : null));
            }
        } catch (error: any) {
            setToast("Error", error.response.data.error || "Error When updating Mobile Number!!");
        }
    };

    const handlePasswordChange = async () => {
        try {
            const res = await API.put('/student/password', { currentPassword, newPassword })
            console.log(res);
            if (res.status) {
                setToast("Success", res.data.message);
                setCurrentPassword('');
                setNewPassword('');
            }
        } catch (error: any) {
            setToast("Error", error.response.data.error || "Error Changing Password!!");
        }
    };

    const handleBugReport = () => {
        alert("Redirecting to bug report form...");
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-x-7 flex">
                    <div className="space-y-3">
                        <InfoDisplay icon={<FiUser className="text-indigo-600" />} value={user?.name || "John Doe"} />
                        <InfoDisplay icon={<FiMail className="text-indigo-600" />} value={user?.email} />
                        <InfoDisplay icon={<FiSmartphone className="text-indigo-600" />} value={user?.mobileNumber} />
                    </div>
                    <div className="space-y-3">
                        <InfoDisplay icon={<FiUser className="text-indigo-600" />} value={user?.id || "John Doe"} />
                        <InfoDisplay icon={<FiUser className="text-indigo-600" />} value={'Department of ' + user?.student.department} />
                        <InfoDisplay icon={<FiUser className="text-indigo-600" />} value={user?.student.year + ' Year'} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Update Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-x-5 flex items-center justify-between">
                    <div className="space-y-2 w-full">
                        <label className="block text-sm font-medium">New Email</label>
                        <div className="flex gap-2">
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter new email" />
                            <Button onClick={handleEmailUpdate} className="bg-slate-900 text-white"><FiEdit className="mr-1" /> Update</Button>
                        </div>
                    </div>
                    <div className="space-y-2 w-full">
                        <label className="block text-sm font-medium">New Mobile Number</label>
                        <div className="flex gap-2">
                            <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter new number" />
                            <Button onClick={handleMobileUpdate} variant='outline' className="bg-slate-900 text-white"><FiEdit className="mr-1" /> Update</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-x-4 flex">
                    <div className="relative w-full">
                        <Input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                        >
                            {showCurrentPassword ? <EyeClose /> : <EyeOpen />}
                        </button>
                    </div>
                    <div className="relative w-full">
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                        >
                            {showNewPassword ? <EyeClose /> : <EyeOpen />}
                        </button>
                    </div>

                    <Button onClick={handlePasswordChange} className="w-fit px-10"><FiKey className="mr-2" /> Change Password</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>FAQs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-700">
                            <Accordion type="single" collapsible>
                                {faqs.map((faq, i) => {
                                    return (
                                        <AccordionItem value={i.toString()}>
                                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                                            <AccordionContent>{faq.answer}</AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </CardContent>
                    </Card>
                    <Button onClick={handleBugReport} variant="outline" className="w-full"><FiAlertCircle className="mr-2" /> Report a Bug</Button>
                </CardContent>
            </Card>
        </div>
    );
};

const InfoDisplay = ({
    icon,
    value,
}: {
    icon: React.ReactNode;
    value?: string;
}) => {
    return (
        <div className="flex items-center gap-2">
            {icon}
            <span>{value || "Not Provided"}</span>
        </div>
    )
}


export default Settings;
