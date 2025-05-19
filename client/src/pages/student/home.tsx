import { AlertCircle, BookOpen, CalendarDays, Clock, CreditCard, FileText, GraduationCap, Mail, Phone, School, User } from 'lucide-react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/student/navbar';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useUser } from '../../context/userProvider';

const HomeRoot: React.FC = () => {
    return (
        <div className="flex w-screen h-screen ">
            <Navbar />
            <div className="overflow-auto w-full p-6">
                <Outlet />
            </div>
        </div>
    );
};


export function StudentDashboard() {
    const { user } = useUser()

    const studentDetails = {
        name: user?.name || "Student Name",
        rollNo: user?.id || "S12345",
        email: user?.email || "student@example.com",
        department: user?.student?.department || "Computer Science",
        year: user?.student?.year || "3rd Year",
        mobileNumber: user?.mobileNumber || "+91 9876543210",
        attendance: 87,
        cgpa: 8.7,
        fines: [
            { amount: 300, reason: "Damaged lab equipment", dueDate: "2023-06-15" },
            { amount: 150, reason: "Library late fee", dueDate: "2023-06-20" },
        ],
        complaints: [
            { id: "C001", detail: "AC not working in the lab", status: "Pending", date: "2023-05-28" },
            { id: "C002", detail: "Broken chair in classroom", status: "Resolved", date: "2023-05-15" },
        ],
        timetable: [
            {
                day: "Monday", slots: [
                    { time: "9:00 AM - 10:30 AM", subject: "Data Structures", room: "CS-201" },
                    { time: "11:00 AM - 12:30 PM", subject: "Database Systems", room: "CS-101" },
                    { time: "2:00 PM - 3:30 PM", subject: "Computer Networks Lab", room: "LAB-3" },
                ]
            },
            {
                day: "Tuesday", slots: [
                    { time: "9:00 AM - 10:30 AM", subject: "Algorithms", room: "CS-202" },
                    { time: "11:00 AM - 12:30 PM", subject: "Operating Systems", room: "CS-102" },
                ]
            },
        ],
        assignments: [
            { subject: "Data Structures", title: "Binary Tree Implementation", deadline: "2023-06-10" },
            { subject: "Database Systems", title: "SQL Query Optimization", deadline: "2023-06-12" },
            { subject: "Computer Networks", title: "Network Protocols Report", deadline: "2023-06-15" },
        ],
        exams: [
            { subject: "Data Structures", date: "2023-06-20", time: "9:00 AM - 12:00 PM", venue: "Exam Hall 1" },
            { subject: "Database Systems", date: "2023-06-22", time: "9:00 AM - 12:00 PM", venue: "Exam Hall 2" },
        ]
    }

    // Calculate days remaining for assignments
    const calculateDaysRemaining = (deadline: string) => {
        const today = new Date()
        const dueDate = new Date(deadline)
        const diffTime = dueDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header with student info */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <Card className="w-full md:w-2/3">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-16 w-16 bg-sky-300">
                            <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={studentDetails.name} />
                            <AvatarFallback>{studentDetails.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{studentDetails.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4" />
                                {studentDetails.department}, {studentDetails.year}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-500">Roll No:</span>
                                <span className="text-sm font-medium">{studentDetails.rollNo}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-500">Email:</span>
                                <span className="text-sm font-medium">{studentDetails.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-500">Mobile:</span>
                                <span className="text-sm font-medium">{studentDetails.mobileNumber}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <School className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-slate-500">Department:</span>
                                <span className="text-sm font-medium">{studentDetails.department}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full align-items-center pt-6 md:w-1/3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-bold">{studentDetails.attendance}%</div>
                                <Progress value={studentDetails.attendance} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">CGPA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl font-bold">{studentDetails.cgpa}</div>
                                <Progress value={studentDetails.cgpa * 10} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="timetable" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="fines">Fines</TabsTrigger>
                    <TabsTrigger value="complaints">Complaints</TabsTrigger>
                </TabsList>

                {/* Timetable Tab */}
                <TabsContent value="timetable" className="space-y-4">
                    {studentDetails.timetable.map((day) => (
                        <Card key={day.day}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{day.day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {day.slots.map((slot, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b last:border-0 last:pb-0">
                                            <div className="flex items-center gap-2 min-w-[180px]">
                                                <Clock className="h-4 w-4 text-slate-500" />
                                                <span className="text-sm font-medium">{slot.time}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium">{slot.subject}</div>
                                                <div className="text-sm text-slate-500">Room: {slot.room}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Upcoming Exams</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {studentDetails.exams.map((exam, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-0 last:pb-0">
                                        <div className="flex items-center gap-2 min-w-[120px]">
                                            <CalendarDays className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm font-medium">{exam.date}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{exam.subject}</div>
                                            <div className="text-sm text-slate-500">{exam.time}</div>
                                            <div className="text-sm text-slate-500">Venue: {exam.venue}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Pending Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {studentDetails.assignments.map((assignment, index) => {
                                    const daysRemaining = calculateDaysRemaining(assignment.deadline)
                                    return (
                                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                            <div className="flex-1">
                                                <div className="font-medium">{assignment.title}</div>
                                                <div className="text-sm text-slate-500">{assignment.subject}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-slate-500" />
                                                <span className="text-sm">{assignment.deadline}</span>
                                                <Badge variant={daysRemaining <= 2 ? "destructive" : daysRemaining <= 5 ? "secondary" : "outline"}>
                                                    {daysRemaining} days left
                                                </Badge>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Fines Tab */}
                <TabsContent value="fines" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Outstanding Fines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {studentDetails.fines.length > 0 ? (
                                <div className="space-y-4">
                                    {studentDetails.fines.map((fine, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                                            <div className="flex-1">
                                                <div className="font-medium">{fine.reason}</div>
                                                <div className="text-sm text-slate-500">Due: {fine.dueDate}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4 text-red-500" />
                                                <span className="font-bold text-red-600">₹{fine.amount}</span>
                                                <Button size="sm" variant="outline" className="ml-2">Pay Now</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium">No Outstanding Fines</h3>
                                    <p className="mt-2 text-sm text-slate-500">You don't have any pending fines to pay.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Complaints Tab */}
                <TabsContent value="complaints" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Complaints History</CardTitle>
                            <Button size="sm">New Complaint</Button>
                        </CardHeader>
                        <CardContent>
                            {studentDetails.complaints.length > 0 ? (
                                <div className="space-y-4">
                                    {studentDetails.complaints.map((complaint, index) => (
                                        <div key={index} className="flex flex-col gap-2 p-4 rounded-lg border">
                                            <div className="flex justify-between items-start">
                                                <div className="font-medium">{complaint.detail}</div>
                                                <Badge variant={complaint.status === "Pending" ? "outline" : "secondary"}>
                                                    {complaint.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>Complaint ID: {complaint.id}</span>
                                                <Separator orientation="vertical" className="h-4" />
                                                <CalendarDays className="h-4 w-4" />
                                                <span>Filed on: {complaint.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                                        <FileText className="h-6 w-6 text-slate-500" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium">No Complaints</h3>
                                    <p className="mt-2 text-sm text-slate-500">You haven't filed any complaints yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Academic Resources */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Academic Resources</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                            <BookOpen className="h-8 w-8 mb-2" />
                            <span className="font-medium">Library Catalog</span>
                            <span className="text-xs text-slate-500">Browse and reserve books</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                            <FileText className="h-8 w-8 mb-2" />
                            <span className="font-medium">Course Materials</span>
                            <span className="text-xs text-slate-500">Access lecture notes and slides</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-6 gap-2">
                            <GraduationCap className="h-8 w-8 mb-2" />
                            <span className="font-medium">Academic Calendar</span>
                            <span className="text-xs text-slate-500">Important dates and events</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// This component is needed for the CheckCircle icon in the Fines tab
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}

export default HomeRoot;