const express = require("express");
const generateRoute = require("./routes/generate");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
