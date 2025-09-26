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
const {sendForgetPasswordMail} = require('../utils/sendMail.util');

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
                            .success(200, 'Login successful', 'auth', {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                            });
                    } else {
                        return new ApiResponse(res)
                            .clearToken()
                            .error(400, 'Email or Password invalid');
                    }
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

// get logged in user
const getUser = async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        try {
            // * verifying the token
            const checkUser = jwt.verify(token, process.env.JWT_SECRET);
            if (checkUser) {
                const user = await User.findById(checkUser.id).select(
                    '-password -notes -flashcards -quizzes'
                );
                if (user) {
                    return new ApiResponse(res).success(
                        200,
                        'User found',
                        'auth',
                        user
                    );
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
        return new ApiResponse(res).error(400, 'Token is required');
    }
};

const postLogOut = (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        return new ApiResponse(res)
            .clearToken()
            .success(200, 'Successfully logged out');
    } else {
        return new ApiResponse(res).error(400, 'Token is required');
    }
};

// TODO : forget password controller
const postForgetPassword = async (req, res) => {
    const email = req.body?.email;
    if (email) {
        const user = await User.findOne({email});
        if (user?._id) {
            //sending email to the client
            const token = jwt.sign(
                {type: 'forget password', id: user._id},
                process.env.JWT_SECRET,
                {expiresIn: '5m'}
            );
            sendForgetPasswordMail(user.firstName, user.email, token)
                .then(() => {
                    return new ApiResponse(res).success(200, 'Email sent');
                })
                .catch((error) => {
                    return new ApiResponse(res).error();
                });
        } else {
            return new ApiResponse(res).error(
                404,
                'User not found with the corresponding email'
            );
        }
    } else {
        return new ApiResponse(res).error(400, 'Email is required');
    }
};

const postUpdatePassword = async (req, res) => {
    const token = req.body?.token;
    const {password, confirmPassword} = req.body;

    try {
        const dcryptToken = jwt.verify(token, process.env.JWT_SECRET);
        if (dcryptToken) {
            if (password === confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const updatedUser = await User.findByIdAndUpdate(
                    dcryptToken.id,
                    {
                        password: hashedPassword,
                    }
                );

                if (updatedUser._id) {
                    return new ApiResponse(res).success(
                        200,
                        'Password Updated'
                    );
                }
            } else {
                return new ApiResponse(res).error(
                    400,
                    "Passwords didn't match"
                );
            }
        } else {
            return new ApiResponse(res).error(400, 'Invalid token');
        }
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return new ApiResponse(res).error(
                400,
                'link expired! kindly reset again'
            );
        } else if (err instanceof jwt.JsonWebTokenError) {
            return new ApiResponse(res).error(400, 'Invalid token');
        } else {
            return new ApiResponse(res).error();
        }
    }
};

module.exports.login = login;
module.exports.register = register;
module.exports.getUser = getUser;
module.exports.postLogOut = postLogOut;
module.exports.postForgetPassword = postForgetPassword;
module.exports.postUpdatePassword = postUpdatePassword;
