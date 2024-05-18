const handleError = require('../lib/errorHandler');
const { readDeals, writeDeals } = require('../services/db/deal.service');

exports.getDeals = async (req, res) => {
  try {
    const deals = await readDeals({});
    res.status(200).json(deals);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getDealById = async (req, res) => {
  try {
    const deals = await readDeals({ _id: req.params.id });
    if (!deals.length) return res.status(404).json({ type: 'ErrorNotFound', message: 'Deal not found :/' });
    return res.status(200).json(deals[0]);
  } catch (err) {
    return handleError(err, res);
  }
};

exports.createDeals = async (req, res) => {
  try {
    const writeData = await writeDeals(req.body, 'insertOne');
    res.status(201).json({ type: 'write_insert', result: writeData, message: 'Created.' });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const writeData = await writeDeals(req.body, 'updateOne', { _id: req.params.id });
    if (!writeData.modifiedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Deal not found :/' });
    return res.status(200).json({ type: 'write_update', result: writeData, message: 'Updated.' });
  } catch (err) {
    return handleError(err, res);
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    const writeData = await writeDeals({}, 'deleteOne', { _id: req.params.id });
    if (!writeData.deletedCount) return res.status(404).json({ type: 'ErrorNotFound', message: 'Deal not found :/' });
    return res.status(200).json({ type: 'write_delete', result: writeData, message: 'Deleted.' });
    // 204 : No Content actually returns no content..
  } catch (err) {
    return handleError(err, res);
  }
};
