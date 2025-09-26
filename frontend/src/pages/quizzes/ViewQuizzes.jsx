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
import {Button} from '@/components/ui/button';
import {TbTrashXFilled, TbEye} from 'react-icons/tb';

const ViewQuizzes = () => {
    const [quizzesTitle, setQuizzesTitle] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

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
    }, [deleteLoading]);

    const handleDeleteNote = (quizId) => {
        if (confirm('Are you sure?')) {
            setDataLoading(true);
            setDeleteLoading(true);
            axios
                .delete(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/saved/delete/quiz/${quizId}`,
                    {withCredentials: true}
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setDataLoading(false);
                    setDeleteLoading(false);
                });
        } else {
            return;
        }
    };

    return (
        <div>
            {quizzesTitle.length < 1 && dataLoading === false && (
                <p className="text-2xl">You did not make any Quizzes</p>
            )}
            <ClipLoader
                loading={[dataLoading, deleteLoading].some(
                    (value) => value === true
                )}
            />
            {quizzesTitle.map((quiz, idx) => (
                <div
                    to={`/user/notes/view/${quiz._id}`}
                    className="flex border-b-2 border-gray-200 mb-5 pb-1 gap-2"
                >
                    <p key={idx} className="grow">
                        <span>
                            {idx + 1}. {quiz.title}
                        </span>
                    </p>
                    <Link to={`/user/quiz/view/${quiz._id}`} className="">
                        <Button
                            variant="outline"
                            className="text-green-400 border border-green-100 hover:text-green-400 hover:border-green-400"
                        >
                            <TbEye />
                        </Button>
                    </Link>
                    <Button
                        className="text-red-400 border border-red-100 hover:text-red-400 hover:border-red-400"
                        variant="outline"
                        onClick={() => handleDeleteNote(quiz._id)}
                    >
                        <TbTrashXFilled />
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ViewQuizzes;
