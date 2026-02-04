const fs = require("fs");
const path = require("path");
const controllerTemplate = require("../templates/controller");

module.exports = function generateControllers(entities, basePath) {
  entities.forEach(entity => {
    const content = controllerTemplate(entity);

    fs.writeFileSync(
      path.join(
        basePath,
        "controllers",
        `${entity.name}Controller.js`
      ),
      content
    );
  });
};
