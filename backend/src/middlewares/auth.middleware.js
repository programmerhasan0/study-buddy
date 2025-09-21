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
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return new ApiResponse(res).error(
                        404,
                        'User not found! Please login'
                    );
                }
            }
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return new ApiResponse(res).error(
                    401,
                    'Invalid Session! Please relogin'
                );
            } else {
                return new ApiResponse(res).error();
            }
        }
    } else {
        return new ApiResponse(res).error(401, 'Unauthorized! Please login');
    }
};

module.exports.checkAuth = checkAuth;
