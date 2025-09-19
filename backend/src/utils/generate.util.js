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
const {Type} = require('@google/genai');

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
            `,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {type: Type.STRING},
                    note: {type: Type.STRING},
                },
                required: ['title', 'note'],
            },
        },
    });
    return JSON.parse(response.text);
};

const generateFlashCards = async (text) => {
    const response = await model.generateContent({
        model: version,
        contents: text,
        config: {
            systemInstruction: `You are an expert academic assistant and a Private tutor with 10+ years of experiance. Your task is to generate flashcards from the given text in the content. You also need to generate a suitable title for the flashcards. The flashcards will have 2 sides: front & back. The front will contain the question and the back will contain the answer. You have to give the response in JSON format in an array of object where each object will represent a question and a answer. Here is an example below:

            --- EXAMPLE START ---
            {
            "title" : a suitable title,
            "cards" : [
                    {
                    "front" : "The question will be here"
                    "back" : "The answer will be here""
                    }            
                ]
            }
            --- EXAMPLE END ---

            Make the flashcards well structured format. Ensure the Flashcards cover all key concepts and important details from the text. Don't make more than 20 flashcards at once. You can make less then 20.
            `,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {type: Type.STRING},
                    cards: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                front: {
                                    type: Type.STRING,
                                },
                                back: {
                                    type: Type.STRING,
                                },
                            },
                            required: ['front', 'back'],
                        },
                    },
                },
                required: ['title', 'cards'],
            },
        },
    });
    return JSON.parse(response.text);
};

const generateQuizzes = async (text) => {
    const response = await model.generateContent({
        model: version,
        contents: text,
        config: {
            systemInstruction: `
            You are an expert academic assistant and a Private tutor with 10+ years of experiance. Your task is to generate quizzes from the given text in the content. A single quiz will have a question, 4 options and one correct answer. You have to give the response in JSON format in an array of object where each object will represent a quizz. Here is an example below:

            --- EXAMPLE START ---
            [
                {
                "question" : the question will be here,
                "options" : ["A", "B", "C", "D"],
                correctAnswerIndex : a number from 0 to 3 that maps to the index of the correct anser in the array
                }            
            ]
            --- EXAMPLE END ---

            Make the quizzes well structured format. Ensure the quizzes cover all key concepts and important details from the text. If you want you can make as many quizzes as you want, but try to make 20-30 quizzess at once.
            
            DONT USE anything extra like ('''json <content>''') in your response. just send the response directly. And make the not in 1 line. Multiple line cannot works with "JSON.parse()". for return/enter use pure string format such as "\\n" etc. It should not get an error while parsing but its getting an (,) error. 
            
            `,
            responseMimeType: 'application/json',
            // responseSchema: questionSchema,
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: {type: Type.STRING},
                        options: {
                            type: Type.ARRAY,
                            items: {type: Type.STRING},
                            minItems: 4,
                            maxItems: 4,
                        },
                        correctAnswerIndex: {
                            type: Type.INTEGER,
                            minimum: 0,
                            maximum: 3,
                        },
                    },
                    required: ['question', 'options', 'correctAnswerIndex'],
                },
            },
        },
    });
    console.log(response.text);
    return JSON.parse(response.text);
};

module.exports.generateNotes = generateNotes;
module.exports.generateFlashCards = generateFlashCards;
module.exports.generateQuizzes = generateQuizzes;
