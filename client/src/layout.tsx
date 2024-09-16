import { Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/404';
import ViewComplaints from './pages/complaints';
import StaffHomeLayout, { Home as StaffHome } from './pages/admin/home';
import Login from './pages/login';
import RaiseComplaint from './pages/user/raiseComplaint';
import ReserveLab from './pages/user/reservation';
import UserInfo from './pages/admin/userInfo';
import ReservedDashboard from './pages/admin/reservedDashboard';
import { UserProvider } from './context/userProvider';
import LabItems from './pages/admin/labItems';
import StudentHomeLayout, { Home as StudentHome } from './pages/user/home';
import ProtectedRoutes from './components/protectedRoutes';

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
                    <Route path="labItems" element={<LabItems />} />
                    <Route path="complaints" element={<ViewComplaints />} />
                </Route>
                <Route
                    path="/user"
                    element={
                        <ProtectedRoutes>
                            <StudentHomeLayout />
                        </ProtectedRoutes>}
                >
                    <Route path="dashboard" element={<StudentHome />} />
                    <Route path="reserve" element={<ReserveLab />} />
                    <Route path="raise-complaint" element={<RaiseComplaint />} />
                </Route>
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </UserProvider >
    );
}

export default Layout;
