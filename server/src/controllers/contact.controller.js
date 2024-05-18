const handleError = require('../lib/errorHandler');
const { readContacts, writeContacts } = require('../services/db/contact.service');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await readContacts({});
    res.status(200).json(contacts);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contacts = await readContacts({ _id: req.params.id });
    if (!contacts.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'Contact not found :/' });
    return res.status(200).json(contacts[0]);
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createContacts = async (req, res) => {
  try {
    const writeData = await writeContacts(req.body, 'insertOne');
    res.status(201).json({ type: 'write_insert', result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateContact = async (req, res) => {
  try {
    const writeData = await writeContacts(req.body, 'updateOne', { _id: req.params.id });
    if (!writeData.modifiedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Contact not found :/' });
    return res.status(200).json({ type: 'write_update', result: writeData, message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const writeData = await writeContacts({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Contact not found :/' });
    return res.status(200).json({ type: 'write_delete', result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
