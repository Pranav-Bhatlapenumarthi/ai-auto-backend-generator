// src/generator/validateProject.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function validateProject(targetDir) {
  console.log(`Starting syntax validation for: ${targetDir}`);
  let filesToValidate = [];

  // Helper to recursively find all .js files in the generated folder
  function findJsFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        findJsFiles(fullPath);
      } else if (fullPath.endsWith(".js")) {
        filesToValidate.push(fullPath);
      }
    }
  }

  findJsFiles(targetDir);

  // Run a static syntax check on each file
  for (const file of filesToValidate) {
    try {
      // 'node -c' parses the JS for syntax errors but DOES NOT execute it
      execSync(`node -c "${file}"`, { stdio: "pipe" });
    } catch (error) {
      // If a syntax error is found, extract the useful part of the error message
      const errorMsg = error.stderr ? error.stderr.toString() : error.message;
      console.error(`Syntax Error found in ${file}:\n`, errorMsg);
      
     
      throw new Error(`Syntax validation failed in file: ${path.basename(file)}`);
    }
  }

  console.log("All generated files passed syntax validation!");
  return true;
}

module.exports = validateProject;