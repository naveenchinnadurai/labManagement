export interface Student {
    department: string;
    year: string
}

export interface LoginUserData {
    id?: String,
    email?: String,
    password: String
}


export interface Complaint {
    id: string;
    studentName: string;
    complaintDetails: string;
    studentId: string;
    createdAt: string;
    updatedAt: string;
    status: 'Resolved' | 'Pending' | 'In Progress';
    lab: string;
}