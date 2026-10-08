const ai = require('../config/Gemini');

const createAssessment = async (difficulty, questionCount, description, jobTitle, requiredSkills) => {
    try{
        const prompt = `
You are an AI assessment question generator.

Create a technical assessment based on the following information.

Assessment Description:
${description}

Difficulty:
${difficulty}

Number of Questions:
${questionCount}

Job Title:
${jobTitle}

Required Skills:
${requiredSkills}

Generate exactly ${questionCount} questions.

Question types:
- mcq
- true-false
- question

Use "mcq" for multiple choice questions.
Use "true-false" for True/False questions.
Use "question" for open-ended or coding questions.

For MCQ:
- Provide exactly 4 options.
- correctAnswer must exactly match one of the options.

For true-false:
- options must be ["True", "False"].
- correctAnswer must be either "True" or "False".

For question:
- options must be [].
- correctAnswer can be null if it is an open-ended/coding question.

Each question must contain:
- question
- type
- options
- correctAnswer
- marks

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.

Expected format:

[
    {
        "question": "Question text",
        "type": "mcq",
        "options": [
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4"
        ],
        "correctAnswer": "Option 2",
        "marks": 1
    }
]
`;

        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt
        });

        const text = response.text;
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);
    }catch(error){
        console.error("Error in matchResumeWithAI:", error);
        throw new Error("Failed to match resume with AI");
    }
}

module.exports = createAssessment;