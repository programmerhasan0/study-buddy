/**
 *
 * Project Name : study-buddy (backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ai.controller.js
 * File description: This file will contain all AI related container
 * Date : 17/09/2025
 *
 */

const {
    generateNotes,
    generateFlashCards,
    generateQuizzes,
} = require('../utils/generate.util');

const {ApiResponse} = require('../utils/ApiResponse.util');
const FlashCard = require('../models/flashCard.model');

const Note = require('../models/note.model');
const Quiz = require('../models/quiz.model');
const User = require('../models/user.model');

const makeNote = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateNotes(text).then(async (data) => {
            // TODO : save data to database with the user id which will be retrieved from the token.
            console.log(data);

            const note = new Note({
                userId: req.user._id,
                title: data.title,
                note: data.note,
            });

            const savedNote = await note.save();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {notes: savedNote._id},
                },
                {new: true}
            );
            res.status(200).json(
                new ApiResponse(200, 'Text Summerized', 'note', data)
            );
        });
    } else {
        return res.status(400).json(new ApiResponse(400, 'Prompt is Required'));
    }
};

const makeFlashCards = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateFlashCards(text).then(async (data) => {
            // TODO : save flashcards in database along with the user id
            const flashCard = new FlashCard({
                userId: req.user._id,
                title: data.title,
                flashCard: data.cards,
            });

            const savedCard = await flashCard.save();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {flashcards: savedCard._id},
                },
                {new: true}
            );

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        'Flashcards Generated',
                        'flashcards',
                        data
                    )
                );
        });
    } else {
        return res.status(400).json(new ApiResponse(400, 'Prompt is Required'));
    }
};

const makeQuizzes = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateQuizzes(text).then(async (data) => {
            const quiz = new Quiz({
                userId: req.user._id,
                title: data.title,
                quizzes: data.quizzes,
            });

            const savedQuiz = await quiz.save();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {quizzes: savedQuiz._id},
                },
                {new: true}
            );

            res.status(200).json(
                new ApiResponse(200, 'Quizzes Generated', 'quizz', data)
            );
            return;
        });
    } else {
        return res.status(400).json(new ApiResponse(400, 'Prompt is Required'));
    }
};

module.exports.makeNote = makeNote;
module.exports.makeFlashCards = makeFlashCards;
module.exports.makeQuizzes = makeQuizzes;
