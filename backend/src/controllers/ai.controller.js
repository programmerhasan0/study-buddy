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
} = require('../utils/generate.util.js');

const {ApiResponse} = require('../utils/ApiResponse.util.js');
const FlashCard = require('../models/flashcard.model.js');

const Note = require('../models/note.model.js');
const Quiz = require('../models/quiz.model.js');
const User = require('../models/user.model.js');

const makeNote = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateNotes(text).then(async (data) => {
            // TODO : save data to database with the user id which will be retrieved from the token.

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
            return new ApiResponse(res).success(
                201,
                'Text Summerized',
                'note',
                savedNote._id
            );
        });
    } else {
        return new ApiResponse(res).error(400, 'Prompt is required');
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
                flashcard: data.cards,
            });

            const savedCard = await flashCard.save();

            await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {flashcards: savedCard._id},
                },
                {new: true}
            );

            return new ApiResponse(res).success(
                201,
                'Flashcards Generated',
                'flashcards',
                savedCard._id
            );
        });
    } else {
        return new ApiResponse(res).error(400, 'Prompt is required');
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
            return new ApiResponse(res).success(
                201,
                'Quizzes Generated',
                'quiz',
                savedQuiz._id
            );
        });
    } else {
        return new ApiResponse(res).error(400, 'Prompt is required');
    }
};

module.exports.makeNote = makeNote;
module.exports.makeFlashCards = makeFlashCards;
module.exports.makeQuizzes = makeQuizzes;
