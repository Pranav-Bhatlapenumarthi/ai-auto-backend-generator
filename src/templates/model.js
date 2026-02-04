// src/templates/model.js
module.exports = ({ name, fields }) => `
const mongoose = require("mongoose");

const ${name}Schema = new mongoose.Schema({
${fields.map(f => `  ${f.name}: { type: ${f.type} }`).join(",\n")}
});

module.exports = mongoose.model("${name}", ${name}Schema);
`;
