const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  subject: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
    unique: true,
    sparse: true,
  }, // Name or title of the task
  dueDate: Date, // Date by which the task should be completed
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // Reference to the User model, representing the task's owner

  // Descriptive fields for task details
  status: {
    type: String,
    trim: true,
    enum: ['To Do', 'In Progress', 'Completed', 'Deferred'],
  },
  priority: {
    type: String,
    trim: true,
    enum: ['P0', 'P1', 'P2'],
  },
  description: {
    type: String,
    maxLength: 255,
  }, // Additional information about the task

  // Audit fields for tracking task history
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // User who created the task
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // User who last modified the task

  // Extended functionality
  closedTime: Date, // Date and time when the task was marked as completed
  tags: {
    type: Array,
    properties: {
      type: String,
      trim: true,
      maxLength: 16,
    },
  }, // Comma-separated list of tags for organizing tasks
  reminder: Date, // Date and time for a reminder.
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedToRef', // docs: https://mongoosejs.com/docs/populate.html#dynamic-refpath
  }, // Lookup field for referencing other models (e.g., Project, Deal, Contact)
  relatedToRef: {
    type: String,
    enum: ['Deal', 'Contact'],
  }, // Identifies the model type for RelatedTo
  contactName: {
    type: String,
    ref: 'Contact',
  }, // Reference to a Contact model for associated contacts (optional)
  locked: Boolean, // Flag to indicate if a task is locked for editing (optional)
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
