
import { Eye, EyeOff, Lock, Mail, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/userProvider";
import { login } from "../utils/apiFuntions";

interface LoginUserData {
  email?: string;
  id?: string;
  password: string;
}

export default function Login() {
  const { user, setUser, navigate, setToast } = useUser();

  const [userData, setUserData] = useState<LoginUserData>({
    email: "",
    id: "",
    password: "",
  });

  const [role, setRole] = useState<"staff" | "student">("staff");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.isLoggedIn) {
      if (user.role === "student") {
        navigate(`/user/dashboard`);
      } else {
        navigate(`/admin/dashboard`);
      }
    }
  }, [user, navigate]);

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
    setIsLoading(true);

    try {
      const res = await login({ role, data: userData });

      if (res.status) {
        setUser(res.data);

        if (res.data.role != "student") {
          navigate(`/admin/dashboard`);
        } else {
          navigate(`/user/dashboard`);
        }
      } else {
        setToast("Error", res.data)
      }

    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-gray-600 mt-2">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Role Toggle */}
          <div className="flex items-center justify-center space-x-2 py-2">
            <label className={`cursor-pointer ${role === "staff" ? "text-blue-600" : "text-gray-500"} font-bold`}>
              Staff
            </label>
            <input
              type="checkbox"
              checked={role === "student"}
              onChange={handleRoleToggle}
              className="toggle-checkbox hidden"
            />
            <div
              className={`w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer transition ${role === "student" ? "bg-blue-500" : ""
                }`}
              onClick={handleRoleToggle}
            >
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${role === "student" ? "translate-x-6" : ""
                  }`}
              ></div>
            </div>
            <label className={`cursor-pointer ${role === "student" ? " text-blue-600" : "text-gray-500"} font-bold`}>
              Student
            </label>
          </div>

          {/* Email or Student ID */}
          <div>
            <label className="block text-sm font-medium">{role === "staff" ? "Email Address" : "Student ID"}</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-3 text-gray-500">
                {role === "staff" ? <Mail className="h-4 w-4" /> : <School className="h-4 w-4" />}
              </span>
              <input
                type={role === "staff" ? "email" : "text"}
                name={role === "staff" ? "email" : "id"}
                value={role === "staff" ? userData.email : userData.id}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={role === "staff" ? "name@example.com" : "Enter your student ID"}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-3 text-gray-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Sign-in Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Forgot Password */}
          <div className="text-center text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 underline">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
