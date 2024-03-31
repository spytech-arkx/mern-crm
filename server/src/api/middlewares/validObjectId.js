const ObjectId = require('mongoose').Types.ObjectId;
function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: '400 Bad Request: Invalid ID format.' });
  }
  next(); // Continue to the route handler if ID is valid
};

module.exports = validateObjectId;