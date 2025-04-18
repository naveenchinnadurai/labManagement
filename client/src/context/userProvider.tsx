import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Student } from "../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner"
import API from '../utils/api';
interface User {
    isLoggedIn: boolean;
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    student: Student;
    role: 'Hod' | 'Lab Assistant' | 'Faculty' | 'Admin' | 'student';
    sessionId: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
    setToast: (head: String, message: String) => void;
    navigate: NavigateFunction
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const logout = async () => {
        try {
            await API.put('/auth/logout')
        } catch (error: any) {
            console.log(error)
        } finally {
            localStorage.clear();
            setUser(null)
            navigate('/')
        }
    };

    const setToast = (head: String, message: String) => {
        toast(head, {
            description: message
        })
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout, navigate, setToast }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
