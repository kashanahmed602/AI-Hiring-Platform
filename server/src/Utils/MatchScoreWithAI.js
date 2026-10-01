const ai = require('../config/Gemini');

const matchResumeWithAI = async (resumeData, jobData) => {
    try{
        const prompt = `
You are an expert AI job matching system.

Compare the candidate's resume data with the job data.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not invent information.
3. Match based on meaning, not exact words.
4. Similar job titles should be considered related.
   Example:
   "Full Stack Developer" and "Software Developer" can be related.
5. An ongoing degree can partially satisfy an education requirement.
6. Consider candidate skills, experience, projects, technologies,
   responsibilities and descriptions when evaluating work alignment.
7. Projects are included in workAlignment.
8. Do not require an exact job title match.
9. Missing required skills should reduce the skills score.
10. Do not reject a candidate only because the job title is different.

SCORING:

skillsMatch:
0 = no relevant skills
1 = excellent skills match

experienceMatch:
0 = no relevant experience
1 = excellent experience match

educationMatch:
0 = education does not match
1 = education fully matches

workAlignment:
Consider:
- previous experience
- responsibilities
- experience descriptions
- projects
- project technologies
- overall relevance to this job

Return workAlignment between 0 and 1.

Overall matchScore must be between 0 and 100.

Return exactly this JSON:

{
  "matchScore": 0,
  "matchDetails": {
    "skillsMatch": 0,
    "experienceMatch": 0,
    "educationMatch": 0,
    "workAlignment": 0,
    "strengths": [],
    "missingSkills": [],
    "experienceGap": null
  }
}

CANDIDATE RESUME:
${JSON.stringify(resumeData, null, 2)}

JOB:
${JSON.stringify(jobData, null, 2)}
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

module.exports = matchResumeWithAI;