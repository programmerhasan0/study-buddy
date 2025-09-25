/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewQuizzes.jsx
 * File description: This file shows the quizzes title in the app
 * Date : 25/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {ClipLoader} from 'react-spinners';

const ViewQuizzes = () => {
    const [quizzesTitle, setQuizzesTitle] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        setDataLoading(true);
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/saved/quizzes-title`, {
                withCredentials: true,
            })
            .then((response) => {
                setQuizzesTitle(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, []);

    return (
        <div>
            {quizzesTitle.length < 1 && dataLoading === false && (
                <p className="text-2xl">You did not make any Quizzes</p>
            )}
            <ClipLoader loading={dataLoading} />
            {quizzesTitle.map((quiz, idx) => (
                <li key={idx}>
                    <Link to={`/user/quiz/view/${quiz._id}`}>{quiz.title}</Link>
                </li>
            ))}
        </div>
    );
};

export default ViewQuizzes;
