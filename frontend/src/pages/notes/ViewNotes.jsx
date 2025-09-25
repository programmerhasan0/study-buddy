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
import {ClipLoader} from 'react-spinners';

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        setDataLoading(true);
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
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, []);

    return (
        <div>
            {notes.length < 1 && dataLoading === false && (
                <p className="text-2xl">You did not make any notes</p>
            )}
            <ClipLoader loading={dataLoading} />
            <>
                {notes.map((note, idx) => (
                    <Link to={`/user/notes/view/${note._id}`}>
                        <p key={idx}>
                            <span>
                                {idx + 1}. {note.title}
                            </span>
                        </p>
                    </Link>
                ))}
            </>
        </div>
    );
};

export default ViewNotes;
