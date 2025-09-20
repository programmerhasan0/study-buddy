/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : quiz.model.js
 * File description: This file represents the quizzes collection
 * Date : 20/09/2025
 *
 */

const db = require('../services/db.service');

const quizSchema = db.Schema({
    question: String,
    options: [String],
    correctAnswerIndex: Number,
});

const quizzesSchema = db.Schema({
    userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    quizzes: [quizSchema],
});

const Quiz = db.model('Quiz', quizzesSchema);

module.exports = Quiz;
