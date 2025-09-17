/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ai.service.js
 * File description: This file contains the AI service integration for the Study Buddy project.
 * Date : 17/09/2025
 *
 */

const {GoogleGenAI} = require('@google/genai');

// It will get the api key automatically from .env
const ai = new GoogleGenAI({});

const modelVersion = 'gemini-2.5-flash';

module.exports = {
    model: ai.models,
    version: modelVersion,
};
