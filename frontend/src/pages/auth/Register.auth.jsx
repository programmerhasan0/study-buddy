/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Register.auth.jsx
 * File description: This file contains the Registration form for the app
 * Date : 22/09/2025
 *
 */

import {useState} from 'react';
import RegisterForm from '../../components/auth/RegisterForm.auth';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';

const Register = () => {
    const [regLoading, setRegLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegisterFormSubmit = (data) => {
        setRegLoading(true);
        axios
            .post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, data, {
                withCredentials: true,
            })
            .then((response) => {
                setRegLoading(false);
                navigate('/auth/login', {
                    state: {urlFrom: '/auth/register', registered: true},
                });
            })
            .catch((error) => {
                setRegLoading(false);
                if (error.response.data.status === 400) {
                    toast.error(error.response.data.message);
                }
            })
            .finally(() => {
                setRegLoading(false);
            });
    };
    return (
        <div>
            <RegisterForm
                handleRegisterFormSubmit={handleRegisterFormSubmit}
                regLoading={regLoading}
            />
        </div>
    );
};

export default Register;
