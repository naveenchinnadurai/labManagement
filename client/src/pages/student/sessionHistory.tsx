import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { toast } from 'sonner';
import { useUser } from '../../context/userProvider';
import api from '../../utils/api';
import { LuRefreshCcw as Refresh } from "react-icons/lu";


type Session = {
    id: string;
    device: string;
    lab: string;
    ipAddress: string;
    loginDateTime: string;
    logoutDateTime: string | null;
    isActive: boolean;
};

const StudentLoginHistory: React.FC = () => {

    const { user } = useUser();
    const [sessions, setSessions] = useState<Session[]>();

    // Fetch session data from your API
    const fetchSessions = async () => {
        try {
            const response = await api.get(`/auth/sessions/`);
            console.log(response)
            setSessions(response.data.sessions);
            toast('Success', { description: response.data.message || "Fetched Session Info" });
        } catch (error) {
            toast('Error', { description: 'Failed to load sessions.' });
        }
    };

    useEffect(() => { fetchSessions() }, []);

    const handleLogout = async (sessionId: string) => {
        try {
            const res = await api.put(`/auth/sessions/`, { sessionId });
            console.log(res)
            if (res.status) {
                setSessions((prev) => prev?.filter((session) => session.id !== sessionId));
                toast('Success', { description: res.data.message });
            }
        } catch (error: any) {
            toast('Error', { description: error.response.data.error });
        }
    };

    const handleLogoutAllSession = async () => {
        try {
            const res = await api.put(`/auth/sessions/all`);
            console.log(res)
            if (res.status) {
                toast('Success', { description: res.data.message });
            }
        } catch (error: any) {
            toast('Error', { description: error.response.data.error });
        }
    };

    const activeSessions = sessions?.filter((session) => session.isActive);
    const loginHistory = sessions?.filter((session) => !session.isActive);

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-center '>
                        <div className='space-y-1'>
                            <CardTitle>Active Sessions</CardTitle>
                            <CardDescription>Devices currently logged into your account.</CardDescription>
                        </div>
                        <div>
                            <Button variant="destructive" onClick={handleLogoutAllSession}>
                                Log Out of all Device
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {(activeSessions?.length ?? 0) > 0 ? (
                        <div className="space-y-4">
                            {
                                activeSessions?.map((session) => (
                                    <div key={session.id} className="flex justify-between items-center border p-4 rounded-md">
                                        <div>
                                            <p className="font-medium">{session.device}</p>
                                            <p className="text-sm text-gray-500">{session.lab} • {session.ipAddress}</p>
                                            <p className="text-sm text-gray-500">Logged in at: {new Date(session.loginDateTime).toLocaleString()}</p>
                                        </div>
                                        <Button variant="destructive" disabled={((user?.sessionId) == session.id)} onClick={() => { handleLogout(session.id) }}>
                                            {((user?.sessionId) == session.id) ? "This Session" : "Log Out"}
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No active sessions.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='flex gap-2 items-center'>
                        Login History
                        <Button className='shadow-none w-2' onClick={fetchSessions}>
                            <Refresh />
                        </Button>
                    </CardTitle>
                    <CardDescription>Previous login sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                    {(loginHistory?.length ?? 0) > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Lab</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead>Login Time</TableHead>
                                    <TableHead>Logout Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loginHistory?.map((session) => (
                                    <TableRow key={session.id}>
                                        <TableCell>{session.id}</TableCell>
                                        <TableCell>{session.lab}</TableCell>
                                        <TableCell>{session.ipAddress}</TableCell>
                                        <TableCell>{new Date(session.loginDateTime).toLocaleString()}</TableCell>
                                        <TableCell className='text-center'>{new Date(session.logoutDateTime || '').toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-gray-500">No login history available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentLoginHistory;
