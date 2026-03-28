require("dotenv").config();
const express = require("express");
const generateRoute = require("./routes/generate");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
