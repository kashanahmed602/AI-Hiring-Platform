require("dotenv").config();

const openai = require("../config/OpenA");

const testOpenAI = async () => {
    try {
        const response = await openai.responses.create({
            model: "gpt-5-mini",
            input: "Say hello in one sentence."
        });

        console.log(response.output_text);
    } catch (error) {
        console.error("OpenAI Error:", error.message);
    }
};

testOpenAI();