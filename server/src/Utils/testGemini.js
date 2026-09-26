require("dotenv").config();

const ai = require("../config/Gemini");

const testGemini = async () => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: "Say hello in one sentence."
        });

        console.log(response.text);
    } catch (error) {
        console.error("Gemini Error:", error.message);
    }
};

testGemini();