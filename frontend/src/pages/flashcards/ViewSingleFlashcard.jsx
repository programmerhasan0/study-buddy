/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ViewSingleFlashcard.jsx
 * File description: This file show a single topic flashcards on the user panel
 * Date : 24/09/2025
 *
 */

import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Flashcard from '../../components/flashcard';

const ViewSingleFlashcard = () => {
    const [flashcard, setFlashcard] = useState({});
    const [flipped, setFlipped] = useState(false);

    const {flashcardId} = useParams();

    useEffect(() => {
        axios
            .get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/saved/flashcard/${flashcardId}`,
                {withCredentials: true}
            )
            .then((response) => {
                setFlashcard(response.data.data);
            })
            .catch((error) => {
                console.log('Error : ', error);
            });
    }, []);

    return (
        <div>
            <h2 className="text-3xl mb-2">{flashcard.title}</h2>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {flashcard.flashcard &&
                    flashcard.flashcard.map((card, idx) => (
                        <Flashcard front={card.front} back={card.back} />
                    ))}
            </div>
        </div>
    );
};

export default ViewSingleFlashcard;
