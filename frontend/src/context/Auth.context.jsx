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

import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const contextValue = {
        userState: [user, setUser],
        isLoggedInState: [isLoggedIn, setIsLoggedIn],
    };

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
