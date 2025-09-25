/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewSingleNote.jsx
 * File description: This file shows a detailed note
 * Date : 24/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {toast} from 'react-toastify';
import ReactMarkdown from 'react-markdown';

const ViewSingleNote = () => {
    const [note, setNote] = useState({});
    const {noteId} = useParams();
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/saved/note/${noteId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setNote(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went wrong! Kindly contact the admin');
            });
    });

    return (
        <div>
            <h2 className="text-2xl">{note.title}</h2>
            <div className="text-justify">
                <ReactMarkdown>{note.note}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ViewSingleNote;
