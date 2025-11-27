// backend/models/Vessel.js
import mongoose from 'mongoose';

const vesselSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true,
    maxlength: 15
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  agentName: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Unique index on code
vesselSchema.index({ code: 1 }, { unique: true });

export default mongoose.model('Vessel', vesselSchema);