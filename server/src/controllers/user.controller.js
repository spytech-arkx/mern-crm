const jwt = require('jsonwebtoken');
const {
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../services/db/user.service');
const User = require('../models/user.model');

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

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user || user.verified) {
      throw new Error('Invalid token or user already verified');
    }

    await User.findByIdAndUpdate(userId, { verified: true });

    res.status(200).send('Email verified successfully');
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid token');
  }
};
/*
const scheduleExpiredVerificationTokensCleanup = () => {
  setInterval(async () => {
    try {
      // Récupérez tous les jetons de vérification expirés
      const expiredTokens = await UserVerification.find({ expiresAt: { $lt: new Date() } });

      // Supprimez les utilisateurs associés aux jetons expirés
      const userIdsToDelete = expiredTokens.map(token => token.userId);
      await User.deleteMany({ _id: { $in: userIdsToDelete } });

      // Supprimez les jetons de vérification expirés de la base de données
      await UserVerification.deleteMany({ expiresAt: { $lt: new Date() } });
    } catch (error) {
      console.error('Error cleaning up expired verification tokens:', error);
    }
  }, process.env.CLEANUP_INTERVAL); // Intervalle de nettoyage spécifié dans les variables d'environnement
};
*/

module.exports = { getUsers, getUserById, patchUser, deleteUserById, verifyEmail };
