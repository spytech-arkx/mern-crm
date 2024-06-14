const handleError = require('../lib/errorHandler');
const { readLeads, writeLeads } = require('../services/db/lead.service');

exports.getLeads = async (req, res) => {
  try {
    const leads = await readLeads({ createdBy: req.user._id });
    res.status(200).json(leads);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const leads = await readLeads({ _id: req.params.id });
    if (!leads.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'Lead not found :/' });
    return res.status(200).json(leads[0]);
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createLeads = async (req, res) => {
  try {
    const writeData = await writeLeads(req.body, 'insertOne');
    res.status(201).json({ type: 'write_insert', result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateLead = async (req, res) => {
  try {
    const writeData = await writeLeads(req.body, 'updateOne', { _id: req.params.id });
    if (!writeData.modifiedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Lead not found :/' });
    return res.status(200).json({ type: 'write_update', result: writeData, message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const writeData = await writeLeads({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Lead not found :/' });
    return res.status(200).json({ type: 'write_delete', result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
