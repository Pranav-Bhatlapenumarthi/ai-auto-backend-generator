const fs = require("fs-extra");
const path = require("path");

module.exports = function generateProject(aiSpec) {

  const projectName = aiSpec.projectName || `app-${Date.now()}`;

  const basePath = path.join(__dirname, "..", "..", "temp", projectName);

  // remove old project if it exists
  fs.removeSync(basePath);

  // recreate base directory
  fs.ensureDirSync(basePath);

  aiSpec.files.forEach(file => {

    if (!file.path) return;

    const normalizedPath = file.path.replace(/\\/g, "/");

    // ignore invalid entries (no extension)
    if (!normalizedPath.includes(".")) return;

    const fullFilePath = path.join(basePath, normalizedPath);

    const dir = path.dirname(fullFilePath);

    // create directory safely
    fs.ensureDirSync(dir);

    // write file
    fs.writeFileSync(fullFilePath, file.content || "", "utf8");

    console.log("Writing:", normalizedPath);

  });

  return basePath;
};