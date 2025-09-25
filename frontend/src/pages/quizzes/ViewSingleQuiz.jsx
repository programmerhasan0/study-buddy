/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewSingleQuiz.jsx
 * File description: This file will a a single batch of quizzes in the dashboard
 * Date : 25/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';

const ViewSingleQuiz = () => {
    const [quizDetail, setQuizDetail] = useState({});
    const {quizId} = useParams();

    const answers = ['a', 'b', 'c', 'd'];

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/saved/quiz/${quizId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setQuizDetail(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2 className="text-2xl">{quizDetail.title}</h2>
            <div className="mt-3">
                {quizDetail?.quizzes &&
                    quizDetail.quizzes.map(
                        ({question, options, correctAnswerIndex}, idx) => (
                            <div key={idx} className="mb-3">
                                <p className="italic">
                                    {idx + 1}. {question}
                                </p>
                                <div className="options grid grid-cols-1 md:grid-cols-2">
                                    {options.map((option, index) => (
                                        <p className="" key={index}>
                                            {index + 1 === 1 && `a. ${option}`}
                                            {index + 1 === 2 && `b. ${option}`}
                                            {index + 1 === 3 && `c. ${option}`}
                                            {index + 1 === 4 && `d. ${option}`}
                                        </p>
                                    ))}
                                </div>
                                <p className="font-bold">
                                    {' '}
                                    Correct answer :{' '}
                                    {answers[correctAnswerIndex]}
                                </p>
                            </div>
                        )
                    )}
            </div>
        </div>
    );
};

export default ViewSingleQuiz;
