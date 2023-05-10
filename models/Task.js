const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    completed: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
