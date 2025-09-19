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

const jwt = require('jsonwebtoken');
const {ApiResponse} = require('../utils/ApiResponse.util');

const User = require('../models/user.model');

const checkAuth = async (req, res, next) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            // * verifying the token
            const checkUser = jwt.verify(token, process.env.JWT_SECRET);
            if (checkUser) {
                const user = await User.findById(checkUser.id);
                req.user = user;
                next();
            }
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res
                    .status(401)
                    .json(
                        new ApiResponse(401, 'Invalid Session! Please relogin')
                    );
            } else {
                return res
                    .status(500)
                    .json(new ApiResponse(500, 'Internal Server Error'));
            }
        }
    } else {
        return res.status(401).json({message: 'Unauthorized! Please login'});
    }
};

module.exports.checkAuth = checkAuth;
