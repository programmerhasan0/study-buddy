/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewFlashcards.jsx
 * File description: This file shows the flashcards title in the frontend
 * Date : 24/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {toast} from 'react-toastify';
import {ClipLoader} from 'react-spinners';

const ViewFlashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        setDataLoading(true);
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/saved/flashcards-title`, {
                withCredentials: true,
            })
            .then((response) => {
                setFlashcards(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went wrong');
                console.log(error);
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, []);

    return (
        <div>
            {flashcards.length < 1 && dataLoading === false && (
                <p className="text-2xl">You did not make any flashcards</p>
            )}
            <ClipLoader loading={dataLoading} />
            <>
                {flashcards.map((note, idx) => (
                    <li key={idx}>
                        <Link to={`/user/flashcard/view/${note._id}`}>
                            {note.title}
                        </Link>
                    </li>
                ))}
            </>
        </div>
    );
};

export default ViewFlashcards;
