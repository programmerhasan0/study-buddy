/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : note.model.js
 * File description: This file represents the notes collection
 * Date : 20/09/2025
 *
 */

const db = require('../services/db.service.js');

const noteSchema = db.Schema({
    userId: {type: db.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    note: String,
});

const Note = db.model('Note', noteSchema);

module.exports = Note;
