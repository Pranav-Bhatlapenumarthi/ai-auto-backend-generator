// src/generator/generateProject.js
const fs = require("fs");
const path = require("path");
const generateModels = require("./generateModels");
const generateRoutes = require("./generateRoutes.js");
const generateControllers = require("./generateControllers");

module.exports = function generateProject(spec) {
  const basePath = path.join(
    __dirname,
    "..",
    "..",
    "temp",
    spec.projectName
  );

  fs.mkdirSync(basePath, { recursive: true });
  fs.mkdirSync(path.join(basePath, "models"));
  fs.mkdirSync(path.join(basePath, "routes"));
  fs.mkdirSync(path.join(basePath, "controllers"));

  generateModels(spec.entities, basePath);
  generateRoutes(spec.entities, basePath);
  generateControllers(spec.entities, basePath);

  return basePath;
};
