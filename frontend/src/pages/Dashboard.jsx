/**
 *
 * Project Name : study-buddy (frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : Dashboard.jsx
 * File description: This file represents the dashboard of a user
 * Date : 24/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {useAuthContext} from '../context/Auth.context';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Link} from 'react-router';

const Dashboard = () => {
    const {
        user: [user],
    } = useAuthContext();
    const [userGeneratedInfo, setUserGeneratedInfo] = useState({
        notes: [],
        flashcards: [],
        quizzes: [],
    });

    useEffect(() => {
        axios
            .all([
                axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/saved/notes-title`,
                    {
                        withCredentials: true,
                    }
                ),
                axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/saved/flashcards-title`,
                    {withCredentials: true}
                ),
                axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/saved/quizzes-title`,
                    {withCredentials: true}
                ),
            ])
            .then(([notes, flashcards, quizzes]) => {
                setUserGeneratedInfo({
                    notes: notes.data.data,
                    flashcards: flashcards.data.data,
                    quizzes: quizzes.data.data,
                });
            });
    }, []);

    return (
        <div>
            <h2 className="md:text-2xl text-xl">
                Hi {user.firstName} {user.lastName}, Here are your some info :
            </h2>
            <div className="mt-5 flex flex-col items-center justify-center lg:grid lg:grid-cols-3">
                <div className="w-3xs mt-2 mb-3 p-2">
                    <Link to="/user/notes/view">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p> {userGeneratedInfo.notes.length}</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div className="w-3xs mt-2 mb-3 p-2">
                    <Link to="/user/flashcards/view">
                        <Card>
                            <CardHeader>
                                <CardTitle>Flashcards</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p> {userGeneratedInfo.flashcards.length}</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div className="w-3xs mt-2 mb-3 p-2">
                    <Link to="user/quizzes/view">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quizzes : </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p> {userGeneratedInfo.quizzes.length}</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
