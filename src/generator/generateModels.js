const fs = require("fs");
const path = require("path");
const modelTemplate = require("../templates/model");

module.exports = function generateModels(entities, basePath) {
  entities.forEach(entity => {
    const content = modelTemplate(entity);
    fs.writeFileSync(
      path.join(basePath, "models", `${entity.name}.js`),
      content
    );
  });
};
