const fetch = require("node-fetch");
require("dotenv").config();
const QWEN_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

function clean(text) {
  if (!text) return "";
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
async function callAI(prompt, max_tokens = 1000) {

  const response = await fetch(QWEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API}`,
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

  //console.log("OpenRouter Raw Response:", JSON.stringify(data, null, 2));

  if (!data.choices) {
    console.error("OpenRouter Error:", data);
    throw new Error("OpenRouter request failed");
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

Only generate the files that are mentioned here in the example format
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

  const raw = await callAI(prompt, 900);

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