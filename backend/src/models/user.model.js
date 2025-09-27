/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : user.model.js
 * File description: this file contains the user model for the Study Buddy project.
 * Date : 15/09/2025
 *
 */

const db = require('../services/db.service.js');

const userSchema = db.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    notes: [{type: db.Schema.Types.ObjectId, ref: 'Note'}],
    flashcards: [{type: db.Schema.Types.ObjectId, ref: 'Flashcard'}],
    quizzes: [{type: db.Schema.Types.ObjectId, ref: 'Quiz'}],
});

const User = new db.model('User', userSchema);

module.exports = User;
