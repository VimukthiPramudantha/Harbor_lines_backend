// backend/models/SeaDestination.js
import mongoose from 'mongoose';

const seaDestinationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true,
    maxlength: 10
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Unique index on code
seaDestinationSchema.index({ code: 1 }, { unique: true });

export default mongoose.model('SeaDestination', seaDestinationSchema);