import { Route, Routes, } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import HomeLayout from './pages/home';

function Layout() {
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/home" element={<HomeLayout />} />
            </Routes>
    )
}

export default Layout