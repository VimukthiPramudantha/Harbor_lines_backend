// backend/models/AirDestination.js
import mongoose from 'mongoose';

const airDestinationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true,
    maxlength: 5,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Unique index on code
airDestinationSchema.index({ code: 1 }, { unique: true });

export default mongoose.model('AirDestination', airDestinationSchema);