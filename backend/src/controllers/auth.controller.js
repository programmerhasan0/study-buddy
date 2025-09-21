/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : auth.controller.js
 * File description: This file contains the authentication controller for the Study Buddy project.
 * Date : 15/09/2025
 *
 */

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const {ApiResponse} = require('../utils/ApiResponse.util');

// login controller
const login = (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return new ApiResponse(res).error(
            400,
            'Email and password are required'
        );
    }

    try {
        User.findOne({email})
            .then(async (user) => {
                if (!user) {
                    return new ApiResponse(res).error(
                        404,
                        'User not found. Please register first.'
                    );
                } else {
                    const pw = user.password;

                    // comparing password
                    const isMatch = await bcrypt.compare(password, pw);

                    // sending response to client
                    if (isMatch) {
                        const token = jwt.sign(
                            {id: user._id.toString()},
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '1d',
                            }
                        );
                        return new ApiResponse(res)
                            .setToken(token)
                            .success(200, 'Login successful');
                    }
                    return new ApiResponse(res)
                        .clearToken()
                        .error(400, 'Email or Password invalid');
                }
            })
            .catch((err) => {
                return new ApiResponse(res)
                    .clearToken()
                    .error(404, 'User not found. Please register first.');
            });
    } catch (err) {
        return new ApiResponse().error();
    }
};

// register controller
const register = async (req, res, next) => {
    const {firstName, lastName, email, password, confirmPassword, phoneNumber} =
        req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !phoneNumber
    ) {
        return new ApiResponse(res).error(400, 'All fields are required');
    }
    if (password !== confirmPassword) {
        return new ApiResponse(res).error(400, 'Passwords do not match');
    }

    // creating password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    user.save()
        .then(() => {
            return new ApiResponse(res).success(
                201,
                'User registered successfully'
            );
        })
        .catch((err) => {
            if (err.code === 11000) {
                return new ApiResponse(res).error(
                    400,
                    'Email or phone number already exists'
                );
            } else {
                return new ApiResponse(res).error(
                    500,
                    'Error registering user. Please contact the Administrator'
                );
            }
        });
};

// TODO : logout controller
// TODO : forget password controller

module.exports.login = login;
module.exports.register = register;
