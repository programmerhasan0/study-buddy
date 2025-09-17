/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : auth.middleware.js
 * File description: This file will contain authentication related middlewares for the Study Buddy project.
 * Date : 17/09/2025
 *
 */

const checkAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        console.log(token);
        next();
    } else {
        return res.status(401).send('Unauthorized! Please Login');
    }
};

module.exports.checkAuth = checkAuth;
