import { redirect } from "react-router-dom";
import API from "./api";
import { LoginUserData } from "./types";

interface LoginProp {
    role: 'staff' | 'student';
    data: LoginUserData;
}

export const login = async ({ role, data }: LoginProp): Promise<any> => {
    try {

        const response = await API.post("auth/login", { type: role, userData: data });

        if (response.status === 201) {
            localStorage.setItem('token', response.data.token);

            return {
                status: true,
                data: {
                    isLoggedIn: true,
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    student: {
                        department: response.data.user.department || null,
                        year: response.data.user.year || null
                    },
                    sessionId: response.data.sessionId,
                    mobileNumber: response.data.user.mobileNumber,
                    role: response.data.user.adminRole || 'student',
                }
            }
        }
        return {
            status: false,
            data: "error"
        }
    } catch (error: any) {
        console.log(error)
        return {
            status: false,
            data: error.response.data.error
        };
    }
}

export const fetchAdmins = async () => {
    try {
        const response = await API.get("users/admins/");
        return response.data.data;
    } catch (err) {
        console.log("Failed to fetch admins");
        return null;
    }
};

export const fetchSessions = async () => {
    try {
        const response = await API.get(`/auth/sessions/`);
        return { status: true, data: response.data.sessions };
    } catch (error: any) {
        return { status: false, data: error.response.data.sessions };

    }
};