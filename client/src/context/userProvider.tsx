import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Student } from "../utils/types";

interface User {
    isLoggedIn: Boolean;
    id: string;
    name: string;
    email: string;
    mobileNumber: string;
    student: Student;
    role: 'admin' | 'user' | 'superAdmin';
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
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
