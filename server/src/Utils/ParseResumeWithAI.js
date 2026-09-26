const ai = require("../config/Gemini");

const parseResumeWithAI = async (resumeText) => {
    try {
        const currentDate = new Date().toISOString().split("T")[0];

        const prompt = `
You are an expert resume parser and resume analyzer.

Analyze the resume text provided below and return ONLY valid JSON.

IMPORTANT RULES:

- Extract information from the entire resume.
- Understand the semantic meaning and context of the resume.
- Do not depend on fixed headings, positions, or layouts.
- Different resumes can have completely different formats.
- Extract the same information regardless of resume layout.
- Extract only information supported by the resume.
- Do not invent or assume information.
- If information is missing, use null.
- For missing lists, return [].
- Keep skills as simple strings.
- Do not assign skill categories.
- Do not assign skill proficiency unless explicitly mentioned.
- Preserve dates as written in the resume.
- Do not add explanations outside the JSON.

CURRENT DATE:
${currentDate}


CURRENT ROLE RULES:

currentRole represents the candidate's current professional role or the professional role they are currently positioning themselves for.

Follow these rules in this exact priority:

1. First check the experience section for an ongoing/current position.

2. If an experience entry is explicitly marked as:
   - Present
   - Current
   - Currently working
   - Ongoing
   - Till date
   - To date
   - or an equivalent phrase

   then use that experience's job title as currentRole.

3. If multiple ongoing positions exist, identify the primary professional role based on the resume's overall context and professional positioning.

4. If there is NO ongoing/current experience, DO NOT use the role from an old/ended job as currentRole merely because it is the latest experience.

5. If there is no ongoing employment, analyze the candidate's:
   - professional headline
   - resume title
   - summary
   - skills
   - projects
   - overall career positioning

   and determine the primary professional role the candidate is currently positioning themselves for.

6. Example:

   Headline:
   "Full Stack Developer | MERN Stack Developer"

   Previous experience:
   "Frontend Developer - ABC Company - 2024 to 2025"

   Since the job has ended and there is no current employment:

   currentRole should be:
   "Full Stack Developer"

   NOT:
   "Frontend Developer"

7. Another example:

   Headline:
   "Full Stack Developer | MERN Stack Developer"

   Current experience:
   "Backend Developer - XYZ Company - 2025 to Present"

   Then:

   currentRole should be:
   "Backend Developer"

8. currentRole must be a professional job role/title, not a company name.

9. Do not blindly copy the headline if it contains multiple roles. Identify the primary professional role from the overall context.

10. currentRole is intended to be useful for job matching and should represent the candidate's current professional direction.

11. Return null only when there is not enough information anywhere in the resume to identify a professional role.


HEADLINE RULES:

- Extract the professional headline/title when explicitly present.
- Preserve the meaningful professional wording.
- Do not create a headline if one is not present.
- If no explicit headline is present, return null.
- Do not replace or modify the headline based on currentRole.


EXPERIENCE RULES:

- Extract ALL professional work experiences mentioned in the resume.
- Do not omit older experiences.
- Understand different date formats, including:

  "Jun 2025 - Aug 2026"
  "June 2025 to August 2026"
  "06/2025 - 08/2026"
  "2025 - 2026"
  "Jan 2024 - Present"
  "2024 - Current"

- If the resume says:
  "Present"
  "Current"
  "Currently working"
  "Ongoing"
  "Till date"
  "To date"
  or similar wording,

  set isCurrent to true.

- If the employment clearly ended, set isCurrent to false.

- If it is impossible to determine whether the position is current, use null.

- Preserve the original date representation in startDate and endDate.

- Do not invent exact dates when only years or months are provided.

- Identify company name and job role separately.

- Do not confuse a company name with a job title.

- Extract employment type only when explicitly mentioned.

- Extract responsibilities and technologies when explicitly supported by the resume.


YEARS OF EXPERIENCE RULES:

- Calculate the candidate's total professional experience from all professional experience entries.
- Understand different date formats regardless of how they are written.
- If an experience is ongoing, calculate its duration up to the current date.
- Do not double-count overlapping employment periods.
- If multiple jobs overlap, count the overlapping period only once.
- If the resume explicitly states total professional experience and it is clear and reliable, use it as supporting information.
- Prefer actual employment dates when sufficiently available.
- Do not invent missing dates or experience.

IMPORTANT OUTPUT FORMAT:

- Return yearsOfExperience as a HUMAN-READABLE STRING.
- Do NOT return a decimal number.
- Do NOT return months as a decimal.
- Do NOT return the value in years as a number.

Examples:

1 year
1 year 2 months
2 years
2 years 6 months
8 months

Use correct singular/plural grammar:

- "1 year"
- "2 years"
- "1 month"
- "2 months"

If experience cannot reasonably be calculated from the available information, return null.


SKILLS RULES:

- Extract technical and professional skills explicitly mentioned in the resume.
- Keep every skill as a simple string.
- Do not create skill categories.
- Do not infer skills that are not supported by the resume.


EDUCATION RULES:

- Extract education independently from professional experience.
- Do not treat education as professional experience.
- Preserve degree, field of study, institution and dates when available.


PROJECT RULES:

- Extract projects separately from professional employment.
- Do not treat a project as employment unless the resume explicitly identifies it as professional work.
- Extract technologies and URLs when available.


CERTIFICATION RULES:

- Extract only explicitly mentioned certifications.
- Do not invent issuers, dates or credential URLs.


LANGUAGE RULES:

- Extract human languages only.
- Do not treat programming languages such as JavaScript, Python, C++, Java, etc. as human languages.
- Only include proficiency when explicitly mentioned.


LINK RULES:

- Extract professional links explicitly present in the resume.
- Identify links such as:
  GitHub
  LinkedIn
  Portfolio
  Personal Website
  Behance
  Dribbble
  etc.

- If an actual URL is present, return the actual URL.
- Do not create or guess URLs.
- If only "GitHub", "LinkedIn", "Portfolio", etc. appears without an actual URL, return url as null.
- Do not convert a username into a fake URL.


GENERAL RULES:

- Do not duplicate the same experience, project, certification or education entry.
- Do not invent missing information.
- Do not add explanations outside JSON.
- Return valid JSON only.


Return JSON using exactly this structure:

{
    "personal": {
        "fullName": null,
        "email": null,
        "phone": null,
        "location": null
    },

    "professional": {
        "headline": null,
        "currentRole": null,
        "yearsOfExperience": null
    },

    "summary": null,

    "skills": [],

    "experience": [
        {
            "company": null,
            "role": null,
            "employmentType": null,
            "location": null,
            "startDate": null,
            "endDate": null,
            "isCurrent": null,
            "description": null,
            "responsibilities": [],
            "technologies": []
        }
    ],

    "education": [
        {
            "institution": null,
            "degree": null,
            "fieldOfStudy": null,
            "startDate": null,
            "endDate": null,
            "location": null,
            "isCurrent": null
        }
    ],

    "projects": [
        {
            "name": null,
            "description": null,
            "technologies": [],
            "url": null
        }
    ],

    "certifications": [
        {
            "name": null,
            "issuer": null,
            "issueDate": null,
            "expiryDate": null,
            "credentialUrl": null
        }
    ],

    "languages": [
        {
            "name": null,
            "proficiency": null
        }
    ],

    "links": [
        {
            "type": null,
            "url": null
        }
    ]
}

RESUME TEXT:
${resumeText}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt
        });

        const text = response.text;

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanedText);

    } catch (error) {
        console.error("Error parsing resume with AI:", error.message);
        throw new Error("Failed to parse resume with AI");
    }
};

module.exports = parseResumeWithAI;
