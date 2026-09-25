const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const extractResumeText = async (file) => {
    if (!file) {
        throw new Error("No resume file provided");
    }

    // PDF
    if (file.mimetype === "application/pdf") {
        const parser = new PDFParse({
            data: file.buffer
        });

        const result = await parser.getText();

        await parser.destroy();

        return result.text;
    }

    // DOCX
    if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({
            buffer: file.buffer
        });

        return result.value;
    }

    throw new Error("Only PDF and DOCX files are supported");
};

module.exports = extractResumeText;