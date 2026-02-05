module.exports = ({ name }) => `
exports.getAll = (req, res) => {
  res.json({ message: "Get all ${name}" });
};
`;
