/**
 *
 * Project Name : study-buddy (frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : PrivateRoute.jsx
 * File description: This file is a custom Route component for protected routes
 * Date : 24/09/2025
 *
 */

import {Navigate, Route} from 'react-router';
import {useAuthContext} from '../context/Auth.context';

const PrivateRoute = ({children}) => {
    const {
        isLoggedIn: [isLoggedIn],
        userLoading: [userLoading],
    } = useAuthContext();
    console.log(userLoading);
    if (userLoading) return <div className="text-4xl">Loading...</div>;
    if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

    return children;
};

export default PrivateRoute;
