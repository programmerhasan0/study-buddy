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

            Use markdown file writing method so that I can show it into my markdown viewer. Provide detailed study notes in a clear, well structured format. Ensure the notes cover all key concepts and important details from the text.

            DONT USE ANYTHING EXTRA ( LIKE: '''json <content>''') IN YOUR RESPONSE. just send the response directly. And make the not in 1 line. Multiple line cannot works with "JSON.parse()". It should not get an error while parsing but its getting an (,) error. 
            `,
        },
    });

    return JSON.parse(response.text);
};

const generateFlashCards = async (text) => {
    const response = await model.generateContent({
        model: version,
        contents: text,
        config: {
            systemInstruction: `You are an expert academic assistant and a Private tutor with 10+ years of experiance. Your task is to generate flashcards from the given text in the content. The flashcards will have 2 sides: front & back. The front will contain the question and the back will contain the answer. You have to give the response in JSON format in an array of object where each object will represent a question and a answer. Here is an example below:

            --- EXAMPLE START ---
            [
                {
                "front" : "The question will be here"
                "back" : "The answer will be here""
                }            
            ]
            --- EXAMPLE END ---

            Make the study notes well structured format. Ensure the Flashcards cover all key concepts and important details from the text. Don't make more than 20 flashcards at once. You can make less then 20.
            
            DONT USE anything extra like ('''json <content>''') in your response. just send the response directly. And make the not in 1 line. Multiple line cannot works with "JSON.parse()". for return/enter use pure string format such as "\\n" etc. It should not get an error while parsing but its getting an (,) error. 
            `,
        },
    });
    return JSON.parse(response.text);
};

module.exports.generateNotes = generateNotes;
module.exports.generateFlashCards = generateFlashCards;
