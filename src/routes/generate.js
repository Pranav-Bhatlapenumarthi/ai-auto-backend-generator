const express = require("express");
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

    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    archive.pipe(output);

    archive.directory(outputPath, false);

    // IMPORTANT — wait for zip creation to finish
    output.on("close", () => {

      console.log("ZIP created:", archive.pointer(), "bytes");

      res.download(zipPath);

    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.finalize();

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Generation failed" });

  }

});

module.exports = router;
