const fetch = require("node-fetch");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

function clean(text) {
  if (!text) return "";
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function callAI(prompt, max_tokens = 1000) {

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
      max_tokens
    })
  });

  const data = await response.json();

  if (!data.choices) {
    console.error("Groq Error:", data);
    throw new Error("Groq request failed");
  }

  return data.choices[0].message.content;
}

async function generateFileStructure(userPrompt) {

  const prompt = `
You are a senior Node.js backend architect.

Generate a file structure for this backend project:

${userPrompt}

Rules:
- Include proper file extensions (.js, .json)
- Return ONLY JSON
- Do not include explanations

Example format:

{
 "projectName":"api",
 "files":[
  "package.json",
  "server.js",
  "routes/users.js",
  "controllers/usersController.js",
  "models/User.js",
  "middleware/auth.js",
  "config/db.js"
 ]
}
`;

  const raw = await callAI(prompt, 600);

  const cleaned = clean(raw);

  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI failed to generate project structure");
  }

  return JSON.parse(jsonMatch[0]);
}

async function generateFileContent(filePath, userPrompt) {

  const prompt = `
Generate the code for file: ${filePath}

Project description:
${userPrompt}

Rules:
- Output ONLY raw code
- No explanations
- No markdown
`;

  const raw = await callAI(prompt, 1200);

  return clean(raw);
}

async function generateBackendFromPrompt(userPrompt) {

  console.log("Generating project structure...");

  const structure = await generateFileStructure(userPrompt);

  const generatedFiles = [];

  for (const file of structure.files) {

    console.log("Generating", file);

    const content = await generateFileContent(file, userPrompt);

    generatedFiles.push({
      path: file,
      content
    });

  }

  return {
    projectName: structure.projectName || "generated-api",
    files: generatedFiles
  };
}

module.exports = { generateBackendFromPrompt };