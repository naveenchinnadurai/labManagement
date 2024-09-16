import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useUser } from "../context/userProvider";
import apiClient from "../utils/api";

interface LoginUserData {
  email?: string;
  id?: string;
  password: string;
}

const Login: React.FC = () => {
  const { user, setUser, navigate } = useUser();

  useEffect(() => {
    if (user?.isLoggedIn) {
      if (user.role === 'student') {
        navigate(`/user/dashboard`);
      } else {
        navigate(`/admin/dashboard`);
      }
    }

  }, [])

  const [userData, setUserData] = useState<LoginUserData>({
    email: "",
    id: "",
    password: "",
  });

  const [role, setRole] = useState<"staff" | "student">("staff");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRoleToggle = () => {
    setRole(role === "staff" ? "student" : "staff");
    setUserData({ ...userData, email: "", id: "", password: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
    try {

      const response = await apiClient.post("auth/login", { type: role, userData });
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center"> Login </h2>
        <div className="mb-4 flex items-center justify-center">
          <span className="mr-4 font-medium">Staff</span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={role === "student"}
              onChange={handleRoleToggle}
              className={`absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${role === "student" ? 'right-0' : 'left-0'}`}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"
            ></label>
          </div>
          <span className="ml-4 font-medium">Student</span>
        </div>

        {
          role === "staff" ? (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={userData.id}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )
        }

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showPassword ? <IoMdEyeOff className="text-xl" /> : <IoMdEye className="text-xl" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
