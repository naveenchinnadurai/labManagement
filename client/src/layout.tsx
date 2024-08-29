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

function Layout() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomeLayout />} >
                    <Route path="dashboard" element={<Home />} />
                    <Route path="reserveDashBoard" element={<ReservedDashboard />} />
                    <Route path="reserve" element={<ReserveLab />} />
                    <Route path="usersInfo" element={<UserInfo />} />
                    <Route path="complaints" element={<ViewComplaints />} />
                    <Route path="raiseComplaint" element={<RaiseComplaint />} />
                </Route>
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </UserProvider>
    )
}

export default Layout