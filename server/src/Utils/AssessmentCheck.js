const ai = require('../config/Gemini');

const checkAssessment = async (question, answer, passingScore) => {
    try{
        const prompt = `You are an assessment evaluator for an AI Hiring Platform.

Evaluate the candidate's submitted assessment fairly and accurately.

ASSESSMENT QUESTIONS:
${JSON.stringify(question)}

CANDIDATE ANSWERS:
${JSON.stringify(answer)}

PASSING SCORE:
${passingScore}%

EVALUATION RULES:

1. Evaluate every question using its question ID to match the candidate's answer.

2. MCQ QUESTIONS:
   - Compare the candidate's selected answer with the saved correctAnswer.
   - Award full marks if correct; otherwise award 0.
   - Do not give partial marks for MCQs.

3. TRUE/FALSE QUESTIONS:
   - Compare the candidate's answer with correctAnswer.
   - Accept equivalent representations such as "true" and "True".
   - Award full marks if correct; otherwise award 0.

4. DESCRIPTIVE QUESTIONS:
   - Evaluate the actual meaning, correctness, and relevant concepts.
   - Do not require exact wording from the correctAnswer.
   - Award partial marks when the answer is partially correct.
   - Award 0 for an incorrect, irrelevant, or empty answer.

5. CODING QUESTIONS:
   - Evaluate logical correctness, the approach, and whether the solution
     addresses the problem.
   - Do not require identical code or variable names.
   - Consider edge cases when the question provides enough information.
   - Award partial marks for a partially correct solution.
   - Do not claim that code was executed or tested.

6. MARKS:
   - Use the question's marks field as the maximum marks.
   - Never award more than the maximum marks.
   - Calculate totalMarks as the sum of all question marks.
   - Calculate score as the sum of marksAwarded.
   - Calculate percentage = (score / totalMarks) * 100.
   - Round percentage to 2 decimal places.
   - Set result to "Pass" if percentage >= passingScore;
     otherwise set result to "Fail".
   - If totalMarks is 0, return percentage 0 and result "Pending".
        
   
If correctAnswer is null or missing:
- Evaluate the candidate's answer independently.
- Use the question requirements and your technical knowledge.
- For coding questions, assess logical correctness and valid approaches.
- Award partial marks when appropriate.
- Do not automatically award zero just because the expected answer is missing.
- If the question is ambiguous or cannot be evaluated reliably,
  award marks cautiously.

7. OUTPUT:
   - Return valid JSON only. No markdown or additional text.
   - Preserve each candidate's submitted answer.
   - Do not omit any question.
   - Use the following exact structure:

{
  "score": 0,
  "totalMarks": 0,
  "percentage": 0,
  "result": "Pass",
  "answers": [
    {
      "questionId": "question_id",
      "answer": "candidate_submitted_answer",
      "marksAwarded": 0,
      "maxMarks": 0
    }
  ]
}`

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

module.exports = checkAssessment;