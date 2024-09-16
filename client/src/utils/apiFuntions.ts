import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";
import apiClient from "./api";
import { LoginUserData } from "./types";

export const login = async ( { role, data }: { role: String; data: LoginUserData; }) => {
    const navigate = useNavigate();
    const { setUser } = useUser()
    try {

        const response = await apiClient.post("auth/login", { type: role, data });
        console.log(response);
        if (response.status === 201) {
            setUser({
                isLoggedIn: true,
                id: response.data.userInfo.id,
                name: response.data.userInfo.name,
                email: response.data.userInfo.email,
                student: {
                    department: response.data.userInfo.department,
                    year: response.data.userInfo.year
                },
                mobileNumber: response.data.userInfo.mobileNumber,
                role: response.data.userInfo.adminRole || 'student',
            });
            if (role === "staff") {
                navigate(`/admin/dashboard`);
            } else {
                navigate(`/user/dashboard`);
            }
            return;
        }
        console.log(response.data);
    } catch (error) {
        console.error("Error logging in:", error);
    }
}