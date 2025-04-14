import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/protectedRoutes';
import { UserProvider } from './context/userProvider';

import Login from './pages/login';
import ViewComplaints from './pages/complaints';
import PageNotFound from './pages/404';

import StaffHomeLayout, { Home as StaffHome } from './pages/admin/home';
import ReservedDashboard from './pages/admin/reservedDashboard';
import UserInfo from './pages/admin/adminList';
import LabItems from './pages/admin/labItems';
import Students from './pages/admin/students';

import RaiseComplaint from './pages/student/raiseComplaint';
import StudentHomeLayout, { Home as StudentHome } from './pages/student/home';
import Settings from './pages/student/settings';

function Layout() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoutes>
                            <StaffHomeLayout />
                        </ProtectedRoutes>
                    }
                >
                    <Route path="dashboard" element={<StaffHome />} />
                    <Route path="reserveDashBoard" element={<ReservedDashboard />} />
                    <Route path="usersInfo" element={<UserInfo />} />
                    <Route path="students" element={<Students />} />
                    <Route path="labItems" element={<LabItems />} />
                    <Route path="complaints" element={<ViewComplaints />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route
                    path="/student"
                    element={
                        <ProtectedRoutes>
                            <StudentHomeLayout />
                        </ProtectedRoutes>}
                >
                    <Route path="dashboard" element={<StudentHome />} />
                    <Route path="raise-complaint" element={<RaiseComplaint />} />
                    <Route path="complaints" element={<ViewComplaints />} />
                    <Route path="reserve" element={<ReservedDashboard />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </UserProvider >
    );
}

export default Layout;
