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

const {generateNotes, generateFlashCards} = require('../utils/generate.util');

const makeNote = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateNotes(text).then((data) => {
            // TODO : save data to database with the user id which will be retrieved from the token.
            res.status(200).json({message: data});
        });
    } else {
        return res.status(400).json({message: 'Prompt is required'});
    }
};

const makeFlashCards = (req, res) => {
    const {text} = req.body;

    if (text) {
        generateFlashCards(text).then((data) => {
            // TODO : save flashcards in database along with the user id
            return res.status(200).json({message: data});
        });
    } else {
        return res.status(400).json({message: 'Prompt is required'});
    }
};

module.exports.makeNote = makeNote;
module.exports.makeFlashCards = makeFlashCards;
