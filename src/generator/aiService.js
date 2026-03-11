const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_TOKEN);

async function generateBackendFromPrompt(userPrompt) {
  const systemPrompt = `
    You are an expert Node.js backend developer. 
    The user will describe a backend system. 
    You must generate the complete, fully functioning code for this backend.
    
    CRITICAL INSTRUCTION: You MUST respond with ONLY a valid JSON object. Do not include any explanations, greetings, or markdown blocks. Only output the raw JSON in this exact format:
    {
      "projectName": "generated-backend",
      "files": [
        {
          "path": "package.json",
          "content": "{ \\"name\\": \\"app\\", \\"dependencies\\": { \\"express\\": \\"^4.18.2\\" } }"
        },
        {
          "path": "index.js",
          "content": "const express = require('express');\\nconst app = express();\\napp.listen(3000);"
        }
      ]
    }
  `;

  const response = await hf.chatCompletion({
    model: "Qwen/Qwen2.5-Coder-32B-Instruct", 
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 4000,
    temperature: 0.1, 
  });

  const rawContent = response.choices[0].message.content;
  const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    console.error("Raw AI Output:", rawContent);
    throw new Error("Failed to extract valid JSON from the AI response.");
  }

  return JSON.parse(jsonMatch[0]);
}

module.exports = { generateBackendFromPrompt };