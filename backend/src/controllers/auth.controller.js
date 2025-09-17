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

// login controller
const login = (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({message: 'Email and password are required'});
    }

    User.findOne({email})
        .then(async (user) => {
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
                return res.status(200).cookie('token', token).json({
                    message: 'Login successful',
                });
            }
            return res
                .status(400)
                .clearCookie('token')
                .json({message: 'Email or Password invalid'});
        })
        .catch((err) => {
            console.log(err);
            res.status(404).clearCookie('token').json({
                message: 'User not found. Please register first.',
            });
        });
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
        return res.status(400).json({message: 'All fields are required'});
    }
    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Passwords do not match'});
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
            res.status(201).json({message: 'User registered successfully'});
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).json({
                    message: 'Email or phone number already exists',
                });
            } else {
                res.status(500).json({
                    message:
                        'Error registering user. Please contact the Administrator',
                });
            }
        });
};

// TODO : logout controller
// TODO : forget password controller

module.exports.login = login;
module.exports.register = register;
