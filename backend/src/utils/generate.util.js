/**
 *
 * Project Name : study-buddy (backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : generate.util.js
 * File description: This file will contain all ai related content generation methods
 * Date : 17/09/2025
 *
 */

const {version, model} = require('../services/ai.service');

const generateNotes = async (text) => {
    const response = await model.generateContent({
        model: version,
        contents: text,
        config: {
            systemInstruction: `You are an expert academic assistant and a Private tutor with 10+ years of experiance. Your task is to generate comprehensive study notes from the given educational content. Don't make to notes too short nor too big. Stay in the middle. You have to Generate a suitable Title for the note. You will return the data in JSON format so that my application could read it. here is an exam below:

            --- EXAMPLE START ---

            {
            "title" : "The title will be here",
            "note" : "The notes will be here"    
            }
            --- EXAMPLE END ---

            Provide detailed study notes in a clear, well structured format (e.g., using bullet points, headings and bold text). Ensure the notes cover all key concepts and important details from the text.
            
            DONT USE anything extra like ('''json <content>''') in your response. just send the response directly. And make the not in 1 line. Multiple line cannot works with "JSON.parse()". for return/enter use pure string format such as "\\n" etc. It should not get an error while parsing but its getting an (,) error.           
            `,
        },
    });

    return JSON.parse(response.candidates[0].content.parts[0].text);
};

module.exports.generateNotes = generateNotes;
