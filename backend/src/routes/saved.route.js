/**
 *
 * Project Name : study-buddy (backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : saved.route.js
 * File description: This file contains the routes for retriving flashcards, notes, quizzes generated previously
 * Date : 20/09/2025
 *
 */

const router = require('express').Router();
const User = require('../models/user.model');
const {ApiResponse} = require('../utils/ApiResponse.util');

router.post('/flashcards', async (req, res, next) => {
    const flashcards = await User.findById(req.user._id).populate('flashcards');
    res.status(200).json(
        new ApiResponse(
            200,
            'data retrieve successful',
            'flashcards',
            flashcards.flashcards
        )
    );
});

module.exports = router;
