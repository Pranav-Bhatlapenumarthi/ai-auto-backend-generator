
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: { type: String }
});

module.exports = mongoose.model("Comment", CommentSchema);
