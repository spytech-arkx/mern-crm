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
  deal = await getDealByIdCRUD(req.params.id);
  if (!deal) {
    res.json({
      message: `deal id: ${req.params.id} not found`,
    });
  }
  res.json({
    data: deal,
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
  if (!result) {
    res.json({
      message: `Couldn't add this deal`,
    });
  }

  res.status(StatusCodes.OK).json({
    data: result,
  });
};

exports.updateDeal = async (req, res) => {
  //deal = await updateDealCRUD(req.params.id, req.body);
  const {
    deal_name,
    description,
    amount,
    stage,
    company,
    contacts,
    close_date,
  } = req.body;

  const result = await updateDealCRUD(req.params.id, {
    deal_name,
    description,
    amount,
    stage,
    company,
    contacts,
    close_date,
  });
  if (!result) {
    res.json({
      message: `deal id: ${req.params.id} not found`,
    });
  }
  res.status(200).json({
    data: result,
  });
};
exports.deleteDeal = async (req, res) => {
  deal = await deleteDealCRUD(req.params.id);
  if (!deal) {
    res.json({
      message: `Couldn't Delete this deal`,
    });
  }
  res.status(200).json({
    data: deal,
  });
};
