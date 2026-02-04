// src/templates/route.js
module.exports = ({ name }) => `
const express = require("express");
const controller = require("../controllers/${name}Controller");
const router = express.Router();

router.get("/", controller.getAll);

module.exports = router;
`;
