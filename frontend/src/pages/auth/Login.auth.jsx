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
import {useEffect, useState} from 'react';
import {ClipLoader} from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        user: [user, setUser],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
    } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = (data) => {
        setLoading(true);
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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (location.state?.registered) {
            toast.success('Succesfully Registered. Please login');
        } else if (location.state?.reset) {
            toast.success('Password updated! Please login');
        }
    }, []);

    return (
        <div className="relative">
            <ClipLoader
                className="absolute top-1/2 left-1/2 -translate-1/2"
                loading={loading}
            />
            <LoginForm handleFormSubmit={handleFormSubmit} loading={loading} />
        </div>
    );
};

export default Login;
