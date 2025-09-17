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
const {makeNote} = require('../controllers/ai.controller');

const {generateNotes} = require('../utils/generate.util');

router.post('/make-note', (req, res, next) => {
    const {text} = req.body;

    if (text) {
        generateNotes(text).then((data) => {
            res.status(200).json({message: data});
        });
    } else {
        return res.status(400).json({message: 'Prompt is required'});
    }
});

module.exports = router;
