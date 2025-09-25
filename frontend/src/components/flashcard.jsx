/**
 *
 * Project Name : study-buddy(frontend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : flashcard.jsx
 * File description: This file represents a single flashcard
 * Date : 24/09/2025
 *
 */

import {useState} from 'react';

export default function Flashcard({front, back}) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="" onClick={() => setFlipped((prev) => !prev)}>
            <div
                className={`relative w-64 h-80 transition-transform duration-700 transform-style-preserve-3d cursor-pointer`}
            >
                <div
                    className={`p-2 absolute w-[100%] h-[100%] rounded-lg backface-hidden bg-blue-500 flex justify-center items-center text-white transition-transform duration-700 transform-style-preserve-3d ${
                        flipped ? 'rotate-y-180' : 'rotate-y-0'
                    }`}
                >
                    {front}
                </div>
                <div
                    className={`p-2 absolute w-[100%] h-[100%] rounded-lg backface-hidden bg-green-400 flex justify-center items-center text-white transition-transform duration-700 transform-style-preserve-3d ${
                        flipped ? 'rotate-y-0' : 'rotate-y-180'
                    }`}
                >
                    {back}
                </div>
            </div>
        </div>
    );
}
