/**
 *
 * Project Name : Study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : saved.controller.js
 * File description: This file contains the controllers for saved.route.js
 * Date : 21/09/2025
 *
 */

const Flashcard = require('../models/flashcard.model');
const Quiz = require('../models/quiz.model');
const User = require('../models/user.model');
const Note = require('../models/note.model');
const {ApiResponse} = require('../utils/ApiResponse.util');

const getNotesTitle = async (req, res, next) => {
    const notes = await User.findById(req.user._id).populate({
        path: 'notes',
        select: 'title',
    });
    return new ApiResponse(res).success(
        200,
        'data retrieve successful',
        'notes title',
        notes.notes
    );
};

const getNote = async (req, res, next) => {
    const note = await Note.findById(req.params.noteId).select('-userId -__v');
    if (note) {
        return new ApiResponse(res).success(
            200,
            'Data retrieve successful',
            'note',
            note
        );
    } else {
        return new ApiResponse(res).error(404, 'Note not found');
    }
};

const deleteNote = async (req, res, next) => {
    const noteId = req.params?.noteId;

    if (noteId) {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {notes: noteId},
            },
            {new: true}
        );

        const deletedNote = await Note.findByIdAndDelete(noteId, {
            new: false,
        });

        if (deletedNote) {
            return new ApiResponse(res).success(200, 'Note Deleted');
        } else {
            return new ApiResponse(res).error(404, 'Note not found');
        }
    } else {
        return new ApiResponse(res).error(400, 'Note id is required');
    }
};

const getFlashcardTitles = async (req, res, next) => {
    const flashcards = await User.findById(req.user._id).populate({
        path: 'flashcards',
        select: 'title',
    });
    return new ApiResponse(res).success(
        200,
        'data retrieve successful',
        'flashcards title',
        flashcards.flashcards
    );
};

const getFlashCard = async (req, res, next) => {
    const flashcard = await Flashcard.findById(req.params.cardId).select(
        '-userId -__v'
    );
    if (flashcard) {
        return new ApiResponse(res).success(
            200,
            'Data retrieve successful',
            'flashcard',
            flashcard
        );
    } else {
        return new ApiResponse(res).error(404, 'Flashcard not found');
    }
};

const deleteFlashcard = async (req, res, next) => {
    const flashcardId = req.params?.flashcardId;
    if (flashcardId) {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {flashcards: flashcardId},
            },
            {new: true}
        );

        const deletedFlashcard = await Flashcard.findByIdAndDelete(
            flashcardId,
            {
                new: false,
            }
        );
        if (deletedFlashcard) {
            return new ApiResponse(res).success(200, 'Flashcard Deleted');
        } else {
            return new ApiResponse(res).error(404, 'Flashcard not found');
        }
    } else {
        return new ApiResponse(res).error(400, 'Flashcard Id is required');
    }
};

const getQuizzesTitle = async (req, res, next) => {
    const quizzes = await User.findById(req.user._id).populate({
        path: 'quizzes',
        select: 'title',
    });
    return new ApiResponse(res).success(
        200,
        'data retrieve successful',
        'quizzes title',
        quizzes.quizzes
    );
};

const getQuiz = async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId).select('-userId -__v');
    if (quiz) {
        return new ApiResponse(res).success(
            200,
            'Data retrieve successful',
            'quiz',
            quiz
        );
    } else {
        return new ApiResponse(res).error(404, 'Quiz not found');
    }
};

const deleteQuiz = async (req, res, next) => {
    const quizId = req.params?.quizId;
    if (quizId) {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {quizzes: quizId},
            },
            {new: true}
        );

        const deletedQuiz = await Quiz.findByIdAndDelete(quizId, {new: false});
        if (deletedQuiz) {
            return new ApiResponse(res).success(200, 'Quiz deleted');
        } else {
            return new ApiResponse(res).error(404, 'No quiz found');
        }
    } else {
        return new ApiResponse(400, 'Quiz Id is required');
    }
};

module.exports.getNotesTitle = getNotesTitle;
module.exports.getNote = getNote;
module.exports.deleteNote = deleteNote;

module.exports.getFlashcardTitles = getFlashcardTitles;
module.exports.getFlashCard = getFlashCard;
module.exports.deleteFlashcard = deleteFlashcard;

module.exports.getQuizzesTitle = getQuizzesTitle;
module.exports.getQuiz = getQuiz;
module.exports.deleteQuiz = deleteQuiz;
