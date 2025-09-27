/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : flashCard.model.js
 * File description: This file represenst flashcards collection of the database
 * Date : 19/09/2025
 *
 */

const db = require('../services/db.service.js');

const cardSchema = db.Schema({
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
});

const flashCardSchema = db.Schema({
    userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    flashcard: [cardSchema],
});

const Flashcard = new db.model('Flashcard', flashCardSchema);

module.exports = Flashcard;
