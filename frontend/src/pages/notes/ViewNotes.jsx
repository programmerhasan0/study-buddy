/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewNotes.jsx
 * File description: This file shows the note titles in the frontend
 * Date : 24/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {toast} from 'react-toastify';

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/saved/notes-title`, {
                withCredentials: true,
            })
            .then((response) => {
                setNotes(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went wrong');
                console.log(error);
            });
    }, []);

    return (
        <div>
            <>
                {notes.map((note, idx) => (
                    <li key={idx}>
                        <Link to={`/user/notes/view/${note._id}`}>
                            {note.title}
                        </Link>
                    </li>
                ))}
            </>
        </div>
    );
};

export default ViewNotes;
