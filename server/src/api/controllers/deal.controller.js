const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const {
  getDealsCRUD,
  getDealByIdCRUD,
  addDealCRUD,
  updateDealCRUD,
  deleteDealCRUD,
} = require("../services/db/deal.crud");

exports.getDeals = async (req, res) => {
  const deals = await getDealsCRUD();
  res.status(200).json({
    data: deals,
  });
};
exports.getDealById = async (req, res) => {
  product = await getDealByIdCRUD(req.params.id);
  res.json({
    data: product,
  });
};

exports.createDeal = async (req, res) => {
  const {
    deal_name,
    description,
    amount,
    stage,
    company,
    contacts,
    close_date,
  } = req.body;

  const result = await addDealCRUD({
    deal_name,
    description,
    amount,
    stage,
    company,
    contacts,
    close_date,
  });
  res.status(StatusCodes.OK).json({
    data: result,
    message: "OK",
  });
};

exports.updateDeal = async (req, res) => {
  product = await updateDealCRUD(req.params.id, req.body);
  res.status(200).json({
    data: product,
  });
};
exports.deleteDeal = async (req, res) => {
  product = await deleteDealCRUD(req.params.id);
  return res.status(204).json({
    data: product,
  });
};
