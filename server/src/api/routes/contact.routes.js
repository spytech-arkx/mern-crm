const express = require("express");
const validateObjectId = require("../middlewares/id.validator");
// const validateContact = require('../middlewares/validator');
const sanitize = require('../middlewares/sanitizer');
const { getContactById, getContacts, updateContact, deleteContact, softDeleteContact, createContacts } = require("../controllers/contact.controller");
const contactRouter = express.Router();

contactRouter.post("/", sanitize, /*validateContact, */createContacts);
contactRouter.get("/", getContacts);
contactRouter.get("/:id", validateObjectId , getContactById);
contactRouter.patch("/:id", validateObjectId , sanitize, /*validateContact, */ updateContact);
contactRouter.delete("/:id", validateObjectId , deleteContact);
// contactRouter.delete("/:id", validateObjectId , softDeleteContact);

// contactRouter.get('/analytics')
// contactRouter.get('/analytics/:id')

module.exports = contactRouter;