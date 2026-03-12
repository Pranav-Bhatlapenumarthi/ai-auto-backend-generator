javascript
const validate = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['name', 'email', 'password'];

  requiredFields.forEach((field) => {
    if (!body[field]) {
      return res.status(400).json({ message: `Field ${field} is required` });
    }
  });

  next();
};

module.exports = validate;