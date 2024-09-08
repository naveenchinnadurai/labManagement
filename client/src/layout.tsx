import { Route, Routes, } from 'react-router-dom';
import PageNotFound from './pages/404';
import ViewComplaints from './pages/complaints';
import HomeLayout, { Home } from './pages/home';
import Login from './pages/login';
import RaiseComplaint from './pages/raiseComplaint';
import ReserveLab from './pages/reservation';
import UserInfo from './pages/userInfo';
import ReservedDashboard from './pages/reservedDashboard';
import { UserProvider } from './context/userProvider';
import LabItems from './pages/labItems';

function Layout() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<HomeLayout />} >
                    <Route path="dashboard" element={<Home />} />
                    <Route path="reserveDashBoard" element={<ReservedDashboard />} />
                    <Route path="usersInfo" element={<UserInfo />} />
                    <Route path="labItems" element={<LabItems />} />
                    <Route path="complaints" element={<ViewComplaints />} />
                </Route>
                <Route path="/user" element={<HomeLayout />} >
                    <Route path="reserve" element={<ReserveLab />} />
                    <Route path="raiseComplaint" element={<RaiseComplaint />} />
                </Route>
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </UserProvider>
    )
}

export default Layout