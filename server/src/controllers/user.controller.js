const {
  login,
  createToken,
} = require('../services/db/user.service');


// ↑↑ JWT based auth (Nawfel).

const handleError = require('../helpers/errorHandler');
const User = require('../models/user.model');
const { readUsers, writeUsers, updateWithoutReturn } = require('../services/db/user.service');

// Admin priv. required
exports.getUsers = async (req, res) => {
  try {
    const users = await readUsers({}, { createdAt: 0, modifiedAt: 0 });
    res.status(200).json(users.length ? users : 'Nothing here :/');
  } catch (err) {
    handleError(err, res);
  }
};

// Admin priv. required
exports.getUserById = async (req, res) => {
  try {
    const users = await readUsers({ _id: req.params.id });
    if (!users.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'User not found :/' });
    return res.status(200).json(users[0]);
  } catch (err) {
    return handleError(err, res);
  }
};

// Admin priv. required
exports.createUsers = async (req, res) => {
  try {
    const writeData = await writeUsers(req.body, 'insertOne');
    res.status(201).json({ result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * The register function registers a new user.
 * @param {Object} req- The request object.
 * @param {Object} res - The response.
 */
exports.register = async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      // role: 'Owner', // TO-DO: on peut mettre une logique pour que si l'email qu'il enregistre === process.env.OWNER_MAIL on lui donne le role "Owner"
    });
    const user = await newUser.save();
    res.status(201).json(user);
    // res.redirect('/login');
  } catch (err) {
    handleError(err, res);
  }
};

// Controller function to log in an existing user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    const token = createToken(user._id, user.role);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await updateWithoutReturn(req.params.id, req.body);
    return res.status(200).json({ message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

// TODO: User deactivation, soft-deletion.
exports.deleteUser = async (req, res) => {
  try {
    const writeData = await writeUsers({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'User not found :/' });
    return res.status(200).json({ result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
