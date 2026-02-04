// src/app.js
const express = require("express");
const generateRoute = require("./routes/generate");

const app = express();
app.use(express.json());

app.use("/api/generate", generateRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
