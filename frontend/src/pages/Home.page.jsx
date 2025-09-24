/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Home.page.jsx
 * File description: This fill represenet the Homepage of the application
 * Date : 22/09/2025
 *
 */

import {Link} from 'react-router';
import {Button} from '@/components/ui/button';
import {useAuthContext} from '../context/Auth.context';

const HomePage = () => {
    const {
        user: [user],
        isLoggedIn: [isLoggedIn],
    } = useAuthContext();
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl">
                {isLoggedIn && user
                    ? `Hello ${user.firstName} ${user.lastName}! Please Click below to continue`
                    : 'Hello, Please login to continue'}
            </h2>
            <Link
                className="mt-5"
                to={isLoggedIn ? '/user/dashboard' : '/auth/login'}
            >
                <Button className="w-28">
                    {isLoggedIn ? 'Continute' : 'Login'}
                </Button>
            </Link>
        </div>
    );
};

export default HomePage;
