const handleError = require('../helpers/errorHandler');
const { readCompanies, writeCompanies } = require('../services/db/company.service');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await readCompanies({}, { createdAt: 0, modifiedAt: 0 });
    res.status(200).json(companies);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const companies = await readCompanies({ _id: req.params.id }, { createdAt: 0, modifiedAt: 0 });
    if (!companies.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'Company not found :/' });
    return res.status(200).json({ type: 'read_one', item: companies[0] });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createCompanies = async (req, res) => {
  try {
    const writeData = await writeCompanies(req.body, 'insertOne');
    res.status(201).json({ type: 'write_insert', result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const writeData = await writeCompanies(req.body, 'updateOne', { _id: req.params.id });
    if (!writeData.modifiedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Company not found :/' });
    return res.status(200).json({ type: 'write_update', result: writeData, message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const writeData = await writeCompanies({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Company not found :/' });
    return res.status(200).json({ type: 'write_delete', result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
