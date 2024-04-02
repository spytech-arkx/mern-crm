const handleError = require('../helpers/errorHandler');
const { readUsers, writeUsers } = require('../services/db/user.service');

exports.getUsers = async (req, res) => {
  try {
    const companies = await readUsers({}, { createdAt: 0, modifiedAt: 0 });
    res.status(200).json({ type: 'read_all', items: companies.length ? companies : 'Nothing here :/' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const companies = await readUsers({ _id: req.params.id }, { createdAt: 0, modifiedAt: 0 });
    if (!companies.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'User not found :/' });
    return res.status(200).json({ type: 'read_one', item: companies[0] });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createUsers = async (req, res) => {
  try {
    const writeData = await writeUsers(req.body, 'insertOne');
    res.status(201).json({ type: 'write_insert', result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const writeData = await writeUsers(req.body, 'updateOne', { _id: req.params.id });
    if (!writeData.modifiedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'User not found :/' });
    return res.status(200).json({ type: 'write_update', result: writeData, message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const writeData = await writeUsers({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'User not found :/' });
    return res.status(200).json({ type: 'write_delete', result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
