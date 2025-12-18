// backend/models/Charge.js
import mongoose from 'mongoose';

const chargeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    required: true,
    min: 0
  },
  plGroup: {
    type: String,
    required: true,
    enum: [
      'Freight Revenue', 'Freight Cost',
      'Handling Revenue', 'Handling Cost',
      'Documentation Revenue', 'Documentation Cost',
      'Transport Revenue', 'Transport Cost',
      'Other Revenue', 'Other Cost'
    ]
  }
}, { timestamps: true });

export default mongoose.model('Charge', chargeSchema);