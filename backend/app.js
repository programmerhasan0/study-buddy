/**
 *
 * Project Name : study-buddy
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : app.js
 * File description: This file is the main entry point of the backend application of the Study Buddy project.
 * Date : 15/09/2025
 *
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//cors
const allowOrigins = ['http://localhost:5173', 'http://192.168.0.159:5173'];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('not allowed by cors'));
            }
        },
        credentials: true,
    })
);

// middlewares
const {checkAuth} = require('./src/middlewares/auth.middleware');

// routes
const authRoute = require('./src/routes/auth.route');
const aiRoute = require('./src/routes/ai.route');
const savedRoute = require('./src/routes/saved.route');
const {DummyApiResponse, ApiResponse} = require('./src/utils/ApiResponse.util');

// app middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    return new ApiResponse(res).success(200, 'Working Properly');
});

app.use('/api/ai', checkAuth, aiRoute);
app.use('/api/saved', checkAuth, savedRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
