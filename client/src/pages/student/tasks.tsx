// src/pages/StudentTodayTask.tsx

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../../components/ui/card';
import { toast } from 'sonner';

type Task = {
    id: string;
    title: string;
    description: string;
    assignedBy: string;
    assignedDate: string;
};

const StudentTodayTask: React.FC = () => {
    const [todayTask, setTodayTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTodayTask = async () => {
            try {
                const dummyTasks: Task[] = [
                    {
                        id: '1',
                        title: 'Lab 5: Linked List in C',
                        description: 'Implement singly and doubly linked lists with basic operations in C.',
                        assignedBy: 'Prof. Alan Turing',
                        assignedDate: new Date().toISOString().split('T')[0], // Today's task
                    },
                ];

                const today = new Date().toISOString().split('T')[0];
                const task = dummyTasks.find(t => t.assignedDate === today) || null;

                setTodayTask(task);
            } catch (error) {
                toast('Error', { description: 'Could not fetch today\'s task.' });
            }
        };

        fetchTodayTask();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lab Task for Today</h1>
            {todayTask ? (
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-600">📅 {new Date(todayTask.assignedDate).toLocaleDateString()}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">❓ Question</h2>
                            <p className="text-sm text-gray-700">{todayTask.description}</p>
                        </div>
                        <div>
                            <h2 className="text-md font-semibold text-gray-800">👨‍🏫 Assigned By</h2>
                            <p className="text-sm text-gray-700">{todayTask.assignedBy}</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <p className="text-sm text-gray-500">No task assigned for today’s lab period.</p>
            )}
        </div>
    );
};

export default StudentTodayTask;
