// backend/models/Flight.js
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNo: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true,
    maxlength: 10
  },
  airlineName: {
    type: String,
    required: true,
    trim: true
  },
  airlineCode: {
    type: String,
    uppercase: true,
    trim: true,
    maxlength: 5
  },
  localAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Unique index on flightNo
flightSchema.index({ flightNo: 1 }, { unique: true });

export default mongoose.model('Flight', flightSchema);