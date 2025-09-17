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

// middlewares
const {checkAuth} = require('./src/middlewares/auth.middleware');

// routes
const authRoute = require('./src/routes/auth.route');
const aiRoute = require('./src/routes/ai.route');

// app middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);

//* calling checkAuth middleware here so that it can check all routes except /api/auth routes
app.use(checkAuth);
app.use('/api/ai/', aiRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
