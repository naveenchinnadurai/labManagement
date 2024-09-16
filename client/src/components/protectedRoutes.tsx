import { ReactNode } from 'react';
import { useUser } from '../context/userProvider';

interface ProtectedRoutesProps {
    children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
    const { user } = useUser();

    if (user?.isLoggedIn) {
        return <>{children}</>;
    }

    return (
        <div className='flex h-screen w-screen flex-col items-center justify-center'>
            <h1>Log in to continue!!</h1>
        </div>
    );
}

export default ProtectedRoutes;
