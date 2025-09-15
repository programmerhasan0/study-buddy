/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : db.service.js
 * File description: This file contains the mongoose connection setup for the Study Buddy project.
 * Date : 15/09/2025
 *
 */

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;
