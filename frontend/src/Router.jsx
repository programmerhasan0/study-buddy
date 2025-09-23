/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : App.jsx
 * File description: This file is entry point of the frontend app
 * Date : 22/09/2025
 *
 */

import {BrowserRouter, Route, Routes} from 'react-router';
import Login from './pages/auth/Login.auth';
import Register from './pages/auth/Register.auth';
import HomePage from './pages/Home.page';
import {ToastContainer} from 'react-toastify';
import NotFound from './pages/NotFound.page';
import AuthContextProvider from './context/Auth.context';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <AuthContextProvider>
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth">
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                        <Route path="/user">
                            <Route
                                path="dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
};

export default Router;
