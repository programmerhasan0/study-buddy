/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Auth.context.jsx
 * File description: This file contains the Authentication related context for the app
 * Date : 23/09/2025
 *
 */

import axios from 'axios';
import {useEffect} from 'react';
import {createContext, useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import {toast} from 'react-toastify';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    const contextValue = {
        user: [user, setUser],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userLoading: [userLoading, setUserLoading],
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/auth/me`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.data.data) {
                    setUser(response.data.data);
                    setIsLoggedIn(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setUserLoading(false);
                if (error.response.data.status === 401) {
                    toast.error('Invalid session please login');
                    navigate('/auth/login');
                }
            })
            .finally(() => {
                setUserLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export function useAuthContext() {
    return useContext(AuthContext);
}
