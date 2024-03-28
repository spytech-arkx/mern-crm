const Contact = require('../models/contact.model');
const { readContacts, writeContacts } = require('../services/db/contact.service');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await readContacts({}, { createdAt: 0, modifiedAt: 0 });
    if (!contacts) throw new Error('No contacts found');
    res.status(200).json({ message: 'Data retrieval success.', data: contacts });
  } catch (err) {
    console.error(err);
    if (err.message === 'No contacts found') {
      res.status(404).json({ message: 'No contacts found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.getContactById = async (req, res) => {
  try {
    const singleContact = await readContacts(
      { _id: req.params.id },
      { createdAt: 0, modifiedAt: 0 },
    );
    if (!singleContact) throw new Error('No contacts found');
    res.status(200).json({ message: 'Data retrieval success.', data: singleContact });
  } catch (err) {
    console.log(err);
    if (err.message === 'No contacts found') {
      res.status(404).json({ message: 'No contacts found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

exports.createContacts = async (req, res) => {
    try {
        // In case of bulkwrite.
      const writeData = await writeContacts(req.body);
      res.status(201).json({message: 'Data saved with no issues', writeData }); 
    } catch (err) {
      if (err.type === "ContactValidationError") {
        // Handle validation errors
        res.status(400).json({ message: err.message, errors: err.errors });
      } else if (err.type === "ContactSaveError") {
        // Handle other errors (e.g. database errors)
        console.log('Error creating contact :', err);
        res.status(500).send('Database Error, try again.');
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", err);
        res.status(500).json({ message: "An internal server error occurred." });
      }
    }
  };

exports.updateContact = async (req, res) => {
  try {
    const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!newContact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.status(200).json(newContact);
  } catch (error) {
    console.log("Error updating Contact:", error);
    if (error.name === "ValidationError" || error.name === "CastError") {
      res
        .status(400)
        .send("Invalid Contact data. Please provide all required fields.");
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).send('Client not found');
      return;
    }
    res.status(200).json({
      message: "Contact deleted successfully.",
      deleted,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

// exports.softDeleteContact = (req, res) => {
//   try {
//   } catch (err) {}
// };


// const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // Handle v.erros mn jdr.
//       return res.status(400).json({
//         message: 'Bad Request: Invalid data',
//         errors: errors.array(),
//       });
//     }