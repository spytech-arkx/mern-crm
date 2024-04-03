const mongoose = require('mongoose');
const dealSchema = require('../../models/deal.model');

exports.getDealsCRUD = async () => {
  try {
    const deals = await dealSchema.find({});
    return deals;
  } catch (error) {
    console.error('Error retrieving deals:', error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

exports.getDealByIdCRUD = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid deal ID');
    }
    const deal = await dealSchema.findById(id);
    if (!deal) {
      throw new Error(`Deal id: ${id} not found`);
    }
    return deal;
  } catch (error) {
    console.error(`Error retrieving deal id: ${id}`, error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

exports.addDealCRUD = async (content) => {
  try {
    const newDeal = new dealSchema(content);
    const result = await newDeal.save();
    return result;
  } catch (error) {
    console.error('Error adding deal:', error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

exports.updateDealCRUD = async (id, body) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid deal ID');
    }
    const deal = await dealSchema.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!deal) {
      throw new Error(`Deal id: ${id} not found`);
    }
    return deal;
  } catch (error) {
    console.error('Error updating deal:', error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

exports.deleteDealCRUD = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid deal ID');
    }
    const deal = await dealSchema.findOneAndDelete({ _id: id });
    if (!deal) {
      throw new Error(`Deal id: ${id} not found`);
    }
    return deal;
  } catch (error) {
    console.error('Error deleting deal:', error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};
