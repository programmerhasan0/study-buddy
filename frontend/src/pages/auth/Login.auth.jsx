/**
 *
 * Project Name : study-buddy (frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Login.auth.jsx
 * File description: This file contains the login component for the App
 * Date : 22/09/2025
 *
 */

import {toast} from 'react-toastify';
import LoginForm from '../../components/auth/LoginForm.auth';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router';
import {useAuthContext} from '../../context/Auth.context';
import {useEffect} from 'react';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        user: [user, setUser],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
    } = useAuthContext();
    const handleFormSubmit = (data) => {
        axios
            .post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, data, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data.data);
                setIsLoggedIn(true);

                navigate('/user/dashboard');
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    useEffect(() => {
        if (location.state?.registered)
            toast.success('Succesfully Registered. Please login');
    }, []);
    return <LoginForm handleFormSubmit={handleFormSubmit} />;
};

export default Login;
