const express = require("express");
const fs = require("fs");
const archiver = require("archiver");
const generateProject = require("../generator/generateProject");

// Add this line to import the AI service!
const { generateBackendFromPrompt } = require("../generator/aiService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 1. Send the prompt to Hugging Face AI
    console.log("Generating backend via AI...");
    const aiGeneratedSpec = await generateBackendFromPrompt(prompt);

    // 2. Pass the AI's response to the project builder
    console.log("Writing files to disk...");
    const outputPath = generateProject(aiGeneratedSpec);
    
    // 3. Zip it up
    const zipPath = `${outputPath}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(outputPath, false);

    output.on("close", () => {
      console.log("ZIP created:", archive.pointer(), "bytes");
      res.download(zipPath);
    });

    archive.on("error", (err) => { throw err; });
    archive.finalize();

  } catch (err) {
    console.error("Error generating backend:", err);
    res.status(500).json({ error: "Generation failed." });
  }
});

module.exports = router;