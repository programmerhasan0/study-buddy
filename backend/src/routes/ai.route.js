/**
 *
 * Project Name : study-buddy (backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ai.route.js
 * File description:  This file will contain all ai related routes
 * Date : 17/09/2025
 *
 */

const router = require('express').Router();

// controllers
const {makeNote, makeFlashCards} = require('../controllers/ai.controller');

router.post('/make-note', makeNote);
router.post('/make-flashcards', makeFlashCards);

module.exports = router;
