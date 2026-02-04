const fs = require("fs");
const path = require("path");
const routeTemplate = require("../templates/route");

module.exports = function generateRoutes(entities, basePath) {
  entities.forEach(entity => {
    const content = routeTemplate(entity);

    fs.writeFileSync(
      path.join(
        basePath,
        "routes",
        `${entity.name}Routes.js`
      ),
      content
    );
  });
};
