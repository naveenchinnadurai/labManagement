import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Student } from "../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface User {
    isLoggedIn: boolean;
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    student: Student;
    role: 'Hod' | 'Lab Assistant' | 'Faculty' | 'Admin' | 'student';
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
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

    const logout = () => {
        localStorage.clear();
        setUser(null)
        navigate('/')
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, navigate }}>
            {children}
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
