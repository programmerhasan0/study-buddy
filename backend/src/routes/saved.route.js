/**
 *
 * Project Name : study-buddy (backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : saved.route.js
 * File description: This file contains the routes for retriving and deleting flashcards, notes, quizzes generated previously
 * Date : 20/09/2025
 *
 */

const router = require('express').Router();
const {
    getFlashcardTitles,
    getFlashCard,
    deleteFlashcard,
    getQuizzesTitle,
    getQuiz,
    deleteQuiz,
    getNotesTitle,
    getNote,
    deleteNote,
} = require('../controllers/saved.controller');

// get routes
router.get('/notes-title', getNotesTitle);
router.get('/note/:noteId', getNote);

router.get('/flashcards-title', getFlashcardTitles);
router.get('/flashcard/:cardId', getFlashCard);

router.get('/quizzes-title', getQuizzesTitle);
router.get('/quiz/:quizId', getQuiz);

// delete routes
router.delete('/delete/flashcard', deleteFlashcard);
router.delete('/delete/quiz', deleteQuiz);
router.delete('/delete/note', deleteNote);

module.exports = router;
