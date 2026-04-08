const express = require("express");
const fs = require("fs");
const archiver = require("archiver");
const generateProject = require("../generator/generateProject");
const validateProject = require("../generator/validateProject");
const { generateBackendFromPrompt } = require("../generator/aiService");


const MOCK_AI = false;

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    
    if (MOCK_AI) {
      console.log(" MOCK_AI is TRUE: Running DUMMY script for load testing...");
      
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      let count = 0;
      for (let i = 0; i < 50_000_000; i++) {
          count += Math.sqrt(i); 
      }

      return res.status(200).json({ 
        message: "AWS Mock generation successful. No API credits or disk space used!", 
        cpuBurnResult: count 
      });
    }

    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Generating backend via AI...");
    const aiGeneratedSpec = await generateBackendFromPrompt(prompt);
    
    console.log("Writing files to disk...");
    const outputPath = generateProject(aiGeneratedSpec);

    
    console.log("Validating generated code...");
    try {
        validateProject(outputPath);
    } catch (validationError) {
        console.error("Validation failed:", validationError.message);
        // If validation fails, stop the zip process and return an error
        return res.status(500).json({ 
            error: "The AI generated invalid code with syntax errors. Please try a different prompt.",
            details: validationError.message 
        });
    }
    
    
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
// const express = require("express");
// const fs = require("fs");
// const archiver = require("archiver");
// const generateProject = require("../generator/generateProject");
// const cors = require("cors");

// // Add this line to import the AI service!
// const { generateBackendFromPrompt } = require("../generator/aiService");
// const MOCK_AI = true;

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // 1. Send the prompt to Hugging Face AI
//     console.log("Generating backend via AI...");
//     const aiGeneratedSpec = await generateBackendFromPrompt(prompt);

//     // 2. Pass the AI's response to the project builder
//     console.log("Writing files to disk...");
//     const outputPath = generateProject(aiGeneratedSpec);
    
//     // 3. Zip it up
//     const zipPath = `${outputPath}.zip`;
//     const output = fs.createWriteStream(zipPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     archive.pipe(output);
//     archive.directory(outputPath, false);

//     output.on("close", () => {
//       console.log("ZIP created:", archive.pointer(), "bytes");
//       res.download(zipPath);
//     });

//     archive.on("error", (err) => { throw err; });
//     archive.finalize();

//   } catch (err) {
//     console.error("Error generating backend:", err);
//     res.status(500).json({ error: "Generation failed." });
//   }
// });

// module.exports = router;