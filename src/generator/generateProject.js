const fs = require("fs-extra"); // Changed to fs-extra for easier directory creation
const path = require("path");

module.exports = function generateProject(aiSpec) {
  const projectName = aiSpec.projectName || `app-${Date.now()}`;
  const basePath = path.join(__dirname, "..", "..", "temp", projectName);

  fs.ensureDirSync(basePath);

  aiSpec.files.forEach(file => {
    const fullFilePath = path.join(basePath, file.path);
    fs.outputFileSync(fullFilePath, file.content);
  });

  return basePath;
};