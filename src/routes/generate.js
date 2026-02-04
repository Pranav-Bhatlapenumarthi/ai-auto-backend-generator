// src/routes/generate.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const generateProject = require("../generator/generateProject");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const spec = req.body;

    const outputPath = generateProject(spec);

    const zipPath = `${outputPath}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip");

    archive.pipe(output);
    archive.directory(outputPath, false);
    await archive.finalize();

    res.download(zipPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

module.exports = router;
