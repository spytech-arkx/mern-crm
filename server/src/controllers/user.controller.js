const {
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../services/db/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (err) {
    if (err.message === 'No user available') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json('No such user');
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const patchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const user = await updateUser(userId, newData);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'No such user') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = { getUsers, getUserById, patchUser, deleteUserById };
