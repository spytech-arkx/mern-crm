const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  Subject: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
    unique: true,
  }, // Name or title of the task
  DueDate: Date, // Date by which the task should be completed
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // Reference to the User model, representing the task's owner

  // Descriptive fields for task details
  Status: {
    type: String,
    trim: true,
    enum: ['To Do', 'In Progress', 'Completed', 'Deferred'],
  },
  Priority: {
    type: String,
    trim: true,
    enum: ['P0', 'P1', 'P2'],
  },
  Description: {
    type: String,
    maxLength: 255,
  }, // Additional information about the task

  // Audit fields for tracking task history
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // User who created the task
  ModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // User who last modified the task

  // Extended functionality
  ClosedTime: Date, // Date and time when the task was marked as completed
  Tags: {
    type: Array,
    properties: {
      type: String,
      trim: true,
      maxLength: 16,
    },
  }, // Comma-separated list of tags for organizing tasks
  Reminder: Date, // Date and time for a reminder.
  RelatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedToRef', // docs: https://mongoosejs.com/docs/populate.html#dynamic-refpath
  }, // Lookup field for referencing other models (e.g., Project, Deal, Contact)
  relatedToRef: {
    type: String,
    enum: ['Deal', 'Contact'],
  }, // Identifies the model type for RelatedTo
  ContactName: {
    type: String,
    ref: 'Contact',
  }, // Reference to a Contact model for associated contacts (optional)
  Locked: Boolean, // Flag to indicate if a task is locked for editing (optional)
});

module.exports = mongoose.model('Task', TaskSchema);
