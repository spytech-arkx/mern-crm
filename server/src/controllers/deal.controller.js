const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const {
  getDealsCRUD,
  getDealByIdCRUD,
  addDealCRUD,
  updateDealCRUD,
  deleteDealCRUD,
} = require('../services/db/deal.crud');

exports.getDeals = async (req, res) => {
  try {
    const deals = await getDealsCRUD();
    res.status(StatusCodes.OK).json({
      data: deals,
    });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};

exports.getDealById = async (req, res) => {
  try {
    const deal = await getDealByIdCRUD(req.params.id);
    if (!deal) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Deal id: ${req.params.id} not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      data: deal,
    });
  } catch (error) {
    console.error('Error fetching deal by id:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};

exports.createDeal = async (req, res) => {
  try {
    const { deal_name, description, amount, stage, company, contacts, close_date } =
      req.body;

    // Validate input data (example: check if required fields are present)
    if (!deal_name || !description || !amount || !stage || !company) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Missing required fields',
      });
    }

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
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Couldn't add this deal",
      });
    }

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};

exports.updateDeal = async (req, res) => {
  try {
    const { deal_name, description, amount, stage, company, contacts, close_date } =
      req.body;

    // Validate input data (example: check if required fields are present)
    if (!deal_name || !description || !amount || !stage || !company) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Missing required fields',
      });
    }

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
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Deal id: ${req.params.id} not found`,
      });
    }

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    console.error('Error updating deal:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};

exports.deleteDeal = async (req, res) => {
  try {
    const deal = await deleteDealCRUD(req.params.id);
    if (!deal) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Deal id: ${req.params.id} not found`,
      });
    }
    res.status(StatusCodes.OK).json({
      data: deal,
    });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};
