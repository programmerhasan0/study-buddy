/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : auth.route.js
 * File description: This file contains the authentication routes for the Study Buddy project.
 * Date : 15/09/2025
 *
 */

const router = require('express').Router();
const {
    login,
    register,
    getUser,
    postLogOut,
} = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/logout', postLogOut);

router.post('/register', register);
router.get('/me', getUser);

module.exports = router;
