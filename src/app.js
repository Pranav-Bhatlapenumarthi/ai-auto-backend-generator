require("dotenv").config();
const express = require("express");
const generateRoute = require("./routes/generate");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
console.log("API KEY:", process.env.OPENROUTER_API);

app.use("/api/generate", generateRoute);

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
